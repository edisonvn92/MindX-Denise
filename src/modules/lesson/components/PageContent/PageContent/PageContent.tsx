import React from 'react';
import { Control, useWatch } from 'react-hook-form';
import { PicAndTextContentPage } from './PicAndTextContent/PicAndTextContent';
import { VideoContentPage } from './VideoContent/VideoContent';
import { QuizContentPage } from './QuizContent/QuizContent';
import { CoverPageContent } from './CoverPageContent/CoverPageContent';
import { PageType } from '@/domains/lesson/entities';
import { PageParams } from '@/domains/lesson/ports/payloads';
import { StudentLessonPage } from '@/domains/student-lesson/entities';
import { TakeQuizAnswerInput } from '@/domains/student-lesson/ports/payloads';
import { UserEntity } from '@/domains/user/entities';
import { ContentSizeEnum } from '@/core/context/AppContext';

interface ContentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: Control<any>;
  index: number;
  pageParams?: PageParams[];
  pageList?: StudentLessonPage[];
  contentSize: ContentSizeEnum;
  allowAnswerQuiz?: boolean;
  actionTakeQuiz?(answers: TakeQuizAnswerInput[]): void;
  setDisableNext?: React.Dispatch<React.SetStateAction<boolean>>;
  currentUser: UserEntity;
}

export const PageContent: React.FC<ContentProps> = (props: ContentProps) => {
  const {
    control,
    index,
    pageParams,
    pageList,
    contentSize,
    allowAnswerQuiz,
    actionTakeQuiz,
    setDisableNext,
    currentUser,
  } = props;
  /* eslint-disable */
  const pageType = control
    ? useWatch({ control, name: `pages.${index}.type` })
    : pageParams
    ? pageParams![index].type
    : pageList![index].type;
  const pageCover = control
    ? useWatch({ control, name: `pages.${index}.coverParam` })
    : pageParams
    ? pageParams![index].coverParam
    : pageList![index].content;
  const paramContent = control
    ? useWatch({ control, name: `pages.${index}` })
    : pageParams
    ? pageParams![index]
    : undefined;
  /* eslint-disable */
  const content = pageList ? pageList![index] : undefined;
  switch (pageType) {
    case PageType.PictureAndText: {
      return (
        <PicAndTextContentPage
          paramContent={paramContent}
          content={content}
          contentSize={contentSize}
          currentUser={currentUser}
        />
      );
    }
    case PageType.Video: {
      return (
        <VideoContentPage
          paramContent={paramContent}
          content={content}
          contentSize={contentSize}
          currentUser={currentUser}
        />
      );
    }
    case PageType.Quiz: {
      return (
        <QuizContentPage
          paramContent={paramContent}
          content={content}
          contentSize={contentSize}
          allowAnswerQuiz={allowAnswerQuiz}
          actionTakeQuiz={actionTakeQuiz}
          setDisableNext={setDisableNext}
          currentUser={currentUser}
        />
      );
    }
    default: {
      return <CoverPageContent content={pageCover || paramContent} contentSize={contentSize} />;
    }
  }
};
