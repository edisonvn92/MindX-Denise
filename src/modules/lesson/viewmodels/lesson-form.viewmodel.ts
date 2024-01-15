// Generate code from clean architecture template

import { useFieldArray, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { cloneDeep, isNull } from 'lodash';
import { useToast } from '@mx/ui';
import { LessonHttpRepository } from '../adapters/repositories';
import {
  CoverContent,
  LessonEntity,
  LessonPage,
  PageType,
  PictureAndTextContent,
  QuizContent,
  VideoContent,
} from '@/domains/lesson/entities';
import { CreateLessonUseCase, UpdateLessonUseCase } from '@/domains/lesson/usecases';
import { useAppContext, useBaseViewModel } from '@/core';
import { LessonPayload, PageParams } from '@/domains/lesson/ports/payloads';

interface DetailProps {
  detail?: LessonEntity;
}

export default function LessonFormViewModel(props: DetailProps) {
  const { detail } = props;
  const { t } = useAppContext();
  const createLesson = new CreateLessonUseCase(new LessonHttpRepository());
  const updateLesson = new UpdateLessonUseCase(new LessonHttpRepository());
  const [currentQueryParameters] = useSearchParams();
  const courseId = currentQueryParameters.get('courseId');
  const displayOrder = Number(currentQueryParameters.get('displayOrder'));
  const { loading, success, catchAction } = useBaseViewModel();
  const navigate = useNavigate();
  const toast = useToast();
  const defaultAnswerArray = [
    {
      content: '',
      isCorrect: false,
    },
    {
      content: '',
      isCorrect: false,
    },
  ];
  const defaultPageValue: PageParams = {
    displayOrder: 1,
    type: PageType.Cover,
    pageNumber: undefined,
    pageName: '',
    coverParam: {
      logo: '',
      lessonNumber: undefined,
      lessonName: '',
      learnTime: undefined,
      coverImage: '',
    },
    pictureAndTextParam: {
      introductionPicture: '',
      hasIntroductionPicture: true,
      content: '',
    },
    videoParam: {
      video: '',
    },
    quizParam: {
      hasIntroductionImage: true,
      introductionImage: '',
      quizContent: '',
      hasExplain: true,
      explain: '',
      answers: defaultAnswerArray,
      correctAnswer: undefined,
    },
  };

  const defaultLessonValue = detail
    ? {
        lesson: {
          name: detail.name,
          courseId: detail.courseId || courseId,
          id: detail.id,
          displayOrder: detail.displayOrder,
          learnTime: detail.learnTime,
          totalPage: detail.totalPage,
          isActive: detail.isActive,
        },
        pages: detail.pages.map((page: LessonPage) => {
          const correctAnswer = (page.content as QuizContent)?.answers
            ? (page.content as QuizContent)?.answers.findIndex(
                (answer) => answer.isCorrect === true,
              )
            : -1;
          return {
            pageName: page.pageName,
            pageNumber: page.pageNumber,
            displayOrder: page.displayOrder,
            type: page.type,
            coverParam: page.content as CoverContent,
            pictureAndTextParam: {
              introductionPicture:
                (page.content as PictureAndTextContent)?.introductionPicture || '',
              hasIntroductionPicture: isNull(
                (page.content as PictureAndTextContent)?.hasIntroductionPicture,
              )
                ? true
                : (page.content as PictureAndTextContent)?.hasIntroductionPicture,
              content: (page.content as PictureAndTextContent)?.content || '',
            },
            videoParam: {
              video: (page.content as VideoContent)?.video || '',
            },
            quizParam: {
              hasIntroductionImage: (page.content as QuizContent)?.hasIntroductionImage as boolean,
              introductionImage: (page.content as QuizContent)?.introductionImage || '',
              quizContent: (page.content as QuizContent)?.quizContent || '',
              hasExplain: (page.content as QuizContent)?.hasExplain as boolean,
              explain: (page.content as QuizContent)?.explain || '',
              answers: (page.content as QuizContent)?.answers || defaultAnswerArray,
              correctAnswer: correctAnswer >= 0 ? correctAnswer : undefined,
            },
            id: page.id,
          };
        }),
      }
    : {
        pages: [defaultPageValue],
        lesson: {
          id: '',
          name: '',
          isActive: true,
          courseId,
          displayOrder,
          totalPage: 1,
          learnTime: 0,
        },
      };

  const methodForm = useForm({
    mode: 'onTouched',
    defaultValues: defaultLessonValue,
  });
  const { setValue, getValues, control } = methodForm;
  const pageFieldArray = useFieldArray({
    control,
    name: 'pages',
  });

  const pageFields = pageFieldArray.fields;

  const addPage = () => {
    setValue('lesson.totalPage', getValues('lesson.totalPage') + 1);
    const newData = {
      ...defaultPageValue,
      displayOrder: getValues('lesson.totalPage'),
      type: PageType.PictureAndText,
    };
    pageFieldArray.append(newData);
  };

  const removePage = (index: number) => {
    pageFieldArray.remove(index);
  };

  const removeExtraParamField = (data: LessonPayload) => {
    const changedData = cloneDeep(data);
    const changedPages = data.pages.map((page: PageParams) => {
      const changedPage = cloneDeep(page);
      switch (changedPage.type) {
        case PageType.Cover:
          delete changedPage.pictureAndTextParam;
          delete changedPage.videoParam;
          delete changedPage.quizParam;
          break;
        case PageType.PictureAndText:
          delete changedPage.coverParam;
          delete changedPage.videoParam;
          delete changedPage.quizParam;
          break;
        case PageType.Video:
          delete changedPage.pictureAndTextParam;
          delete changedPage.coverParam;
          delete changedPage.quizParam;
          break;
        case PageType.Quiz:
          delete changedPage.coverParam;
          delete changedPage.pictureAndTextParam;
          delete changedPage.videoParam;
          delete changedPage.quizParam?.correctAnswer;
          break;
        default:
          break;
      }

      return changedPage;
    });
    changedData.pages = cloneDeep(changedPages!);
    return changedData;
  };

  const actionUpdateLesson: (sentData: LessonPayload) => void = async (sentData: LessonPayload) => {
    await catchAction(async () => {
      await updateLesson.run(sentData);
      if (success) {
        toast.addToast({ status: 'success', header: t('lesson:updateLessonSuccessfully') });
      }
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = methodForm.handleSubmit(async (data: any) => {
    try {
      if (!detail) {
        const sentData = removeExtraParamField(data);
        delete sentData.lesson.id;
        const newLesson = await createLesson.run(sentData);
        navigate(`/lesson/edit/${newLesson.id}`, { replace: true });
        navigate(0);
      } else {
        const sentData = removeExtraParamField(data);
        delete sentData.lesson.courseId;
        actionUpdateLesson(sentData);
      }
    } catch (error: any) {
      toast.addToast({ status: 'error', header: error?.message });
    }
  });

  return {
    methodForm,
    onSubmit,
    pageFields,
    addPage,
    removePage,
    loading,
  };
}
