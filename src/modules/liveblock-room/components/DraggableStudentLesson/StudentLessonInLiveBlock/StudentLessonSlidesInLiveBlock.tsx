import React, { useEffect, useMemo, useState } from 'react';
import { useStorage } from '@/modules/liveblock-room/context/liveblock.config';
import { LessonCompletionPage } from '@/modules/student-lesson/screens/LessonLearn/LessonCompletionPage/LessonCompletionPage';
import { LessonStatus, PageStatus, StudentLessonPage } from '@/domains/student-lesson/entities';
import { PageContent } from '@/modules/lesson/components/PageContent/PageContent/PageContent';
import { TakeQuizAnswerInput } from '@/domains/student-lesson/ports/payloads';
import { useAppContext, useCoreContext } from '@/core';
import { ContentSizeEnum } from '@/core/context/AppContext';
import Tour from '@/components/TourGuide';
import { CoreCarousel } from '@/components/Carousel/Carousel';
import './index.scss';

interface StudentLessonSlideProps {
  contentSize?: ContentSizeEnum;
  setIsEditorShown: React.Dispatch<React.SetStateAction<boolean>>;
  isResizing?: boolean;
}

export const StudentLessonSlidesInLiveBlock: React.FC<StudentLessonSlideProps> = (
  props: StudentLessonSlideProps,
) => {
  const { contentSize = ContentSizeEnum.ExtraLarge, setIsEditorShown, isResizing } = props;
  const { studentLesson, actionUpdateLearningProgress, actionTakeQuiz } = useCoreContext();
  const { currentUser } = useAppContext();
  const [latestPage, setLatestPage] = useState<number>(0);
  const learningSlides = useStorage(
    (root) => root.pageData.studentLesson.learningProgresses,
  ) as StudentLessonPage[];
  const [selectedPage, setSelectedPage] = useState<number>(0);
  const lessonStatus = useStorage((root) => root.pageData.studentLesson.status) || '';
  const [lessonSlides, setLessonSlides] = useState<React.ReactNode[]>([]);

  const learningProgress: StudentLessonPage[] = useMemo(() => {
    return learningSlides;
  }, [learningSlides]);

  const onCheckAnswer = async (answers: TakeQuizAnswerInput[]) => {
    await actionTakeQuiz({
      id: studentLesson.id,
      pageId: learningProgress[selectedPage].pageId,
      answers,
    });
  };

  useEffect(() => {
    const slides =
      learningProgress?.length > 0
        ? learningProgress?.map((page: StudentLessonPage, index: number) => {
            return (
              <PageContent
                index={index}
                contentSize={contentSize}
                pageList={learningProgress}
                key={index}
                allowAnswerQuiz={
                  lessonStatus === LessonStatus.Completed || page.status !== PageStatus.Completed
                }
                actionTakeQuiz={onCheckAnswer}
                currentUser={currentUser}
              />
            );
          })
        : [];
    if (studentLesson) slides.push(<LessonCompletionPage />);
    setLessonSlides(slides);
  }, [learningProgress, contentSize]);

  useEffect(() => {
    if (latestPage > 0 && lessonStatus !== PageStatus.Completed) {
      setSelectedPage(latestPage);
    }
  }, [latestPage]);

  useEffect(() => {
    if (learningProgress && learningProgress.length > 0) {
      const latestIndex = learningProgress.findIndex(
        (page: StudentLessonPage) => page.status === PageStatus.NotStarted,
      );
      setLatestPage(latestIndex >= 0 ? latestIndex : learningProgress.length - 1);
    }
  }, [learningProgress]);

  useEffect(() => {
    if (
      studentLesson &&
      selectedPage > latestPage
      // learningProgress[latestPage].status !== PageStatus.Completed
    ) {
      actionUpdateLearningProgress({
        id: studentLesson.id,
        pageId: learningProgress[latestPage].pageId,
        studentId: currentUser.id,
        status: PageStatus.Completed,
      });
      setLatestPage(selectedPage);
    }
  }, [selectedPage]);

  return (
    <>
      <Tour setIsEditorShown={setIsEditorShown} />
      <CoreCarousel
        slides={lessonSlides}
        contentSize={contentSize}
        currentSlide={selectedPage}
        isResizing={isResizing}
      />
    </>
  );
};
