import React, { useEffect, useState } from 'react';
import { useAppContext } from '@/core';
import { QuizContent } from '@/domains/lesson/entities';
import { PageParams } from '@/domains/lesson/ports/payloads';
import { Button, Typography } from '@/mx';
import {
  PageStatus,
  StudentLessonPage,
  StudentPageAnswerContent,
  StudentPageQuizContent,
} from '@/domains/student-lesson/entities';
import { TakeQuizAnswerInput } from '@/domains/student-lesson/ports/payloads';
import { useDataLayerAction } from '@/core/context/TagContext';
import { UserEntity } from '@/domains/user/entities';
import { ContentSizeEnum } from '@/core/context/AppContext';
import { useResponsive } from '@/core/hooks/useResponsive';
import './index.scss';

interface ContentProps {
  content?: StudentLessonPage;
  paramContent?: PageParams;
  contentSize: ContentSizeEnum;
  allowAnswerQuiz?: boolean;
  actionTakeQuiz?(answers: TakeQuizAnswerInput[]): void;
  setDisableNext?: React.Dispatch<React.SetStateAction<boolean>>;
  currentUser: UserEntity;
}

export const QuizContentPage: React.FC<ContentProps> = (props: ContentProps) => {
  const {
    content,
    paramContent,
    contentSize,
    allowAnswerQuiz = true,
    actionTakeQuiz,
    setDisableNext,
    currentUser,
  } = props;
  const { t } = useAppContext();

  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | undefined>(undefined);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const quizContent = (paramContent?.quizParam || content?.content) as QuizContent;
  const questionTextArray = quizContent.quizContent.split('\n') || [];
  const answerList = quizContent?.answers || [];

  const dataLayerAction = useDataLayerAction();
  const {
    fontBodyMatches,
    fontHeadingMatches,
    answerSpacingMatches,
    answerBoxSpacingMatches,
    marginAnswerContentMatches,
    fontAnswerMatches,
    checkAnswerButtonMatches,
    buttonActionWithSlideMatches,
    fontPartLessonMatches,
    boxWrapperMatches,
    marginCheckAnswerMatches,
  } = useResponsive();

  const onSelectAnswer = (index: number) => {
    if (allowAnswerQuiz && !isAnswered) {
      setSelectedAnswerIndex(index);

      // Push the quiz content to the GTM
      dataLayerAction({
        event: 'QUIZ',
        data: {
          user_id: currentUser?.id,
          fullname: currentUser?.fullName,
          role: currentUser?.givenName,
          pageContent: quizContent?.quizContent,
        },
      });
    }
  };

  const onCheckAnswer = async () => {
    if (allowAnswerQuiz && selectedAnswerIndex !== undefined) {
      setIsAnswered(true);
      if (answerList[selectedAnswerIndex].isCorrect) {
        setIsCorrect(true);
      }
      if (actionTakeQuiz)
        await actionTakeQuiz([
          {
            content: answerList[selectedAnswerIndex].content,
            isChosen: true,
            isCorrect: answerList[selectedAnswerIndex].isCorrect,
          },
        ]);
    }
    if (setDisableNext) setDisableNext(false);
  };

  const setAnswerBoxStyle = (index: number) => {
    if (isAnswered) {
      if (quizContent.answers[index].isCorrect) {
        return 'border-mx-green-200 bg-mx-green-50';
      }
      return selectedAnswerIndex === index
        ? 'border-mx-red-200 bg-mx-red-50'
        : 'border-mx-gray-200';
    }
    return index === selectedAnswerIndex
      ? 'border-mx-blue-200 bg-mx-blue-50'
      : 'border-mx-gray-200';
  };

  useEffect(() => {
    if (content && content.status === PageStatus.Completed && !allowAnswerQuiz) {
      const index = (quizContent as StudentPageQuizContent).answers.findIndex(
        (answer: StudentPageAnswerContent) => answer.isChosen === true,
      );
      setSelectedAnswerIndex(index);
      setIsAnswered(true);
      setIsCorrect(quizContent.answers[index]?.isCorrect);
    }
  }, [content]);

  /* eslint-disable */
  return (
    <div className="w-full h-full flex flex-col relative">
      <div className={`${boxWrapperMatches(contentSize)} absolute top-0 `}>
        <div className=" border-left pl-4">
          <div className={fontPartLessonMatches(contentSize)}>
            <Typography
              fontTypo={fontBodyMatches(contentSize)}
              content={`${t('lesson:part')} ${
                paramContent?.pageNumber || content?.pageNumber || '#'
              }`}
            />
          </div>
          <div className="mb-3">
            <Typography
              fontTypo={fontHeadingMatches(contentSize)}
              weight="bold"
              content={paramContent?.pageName || content?.pageName || t('lesson:sectionName')}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center h-[90%]">
        <div
          className={`rounded-xl wrap-break-word border border-solid border-mx-gray-200 bg-mx-white light03 w-3/4 mx-auto ${answerSpacingMatches(
            contentSize,
          )}`}
        >
          <div className={`${marginAnswerContentMatches(contentSize)}`}>
            {questionTextArray.length > 1 || questionTextArray[0] !== '' ? (
              <div
                className={`editor ${fontBodyMatches(contentSize)}`}
                dangerouslySetInnerHTML={{
                  __html:
                    quizContent.quizContent ||
                    (content?.content as StudentPageQuizContent)?.quizContent,
                }}
              />
            ) : (
              <Typography
                fontTypo={fontBodyMatches(contentSize)}
                weight="semibold"
                content={t('lesson:question')}
              />
            )}
          </div>
          <div
            className={`${quizContent?.hasIntroductionImage ? 'grid grid-cols-3' : ''} ${
              contentSize === ContentSizeEnum.Large ? 'gap-5' : 'gap-6'
            } ${marginAnswerContentMatches(contentSize)}`}
          >
            {quizContent && quizContent?.hasIntroductionImage ? (
              quizContent?.introductionImage ? (
                <img
                  src={quizContent?.introductionImage}
                  alt={quizContent?.introductionImage}
                  className="w-full aspect-square object-cover rounded-xl"
                />
              ) : (
                <div className="w-full aspect-square rounded-xl bg-mx-gray-500" />
              )
            ) : undefined}

            {quizContent && quizContent.answers ? (
              <div
                className={`flex flex-col justify-center ${
                  quizContent?.hasIntroductionImage ? 'col-span-2' : ''
                }`}
              >
                {quizContent.answers.map((answer, index) => {
                  const requireSmallSize =
                    quizContent.answers.findIndex(
                      (ans) => ans.content.length > (quizContent.hasIntroductionImage ? 50 : 70),
                    ) > -1;
                  return (
                    <div
                      key={index}
                      className={`rounded-xl wrap-break-word border border-solid  
                    ${
                      allowAnswerQuiz && index !== selectedAnswerIndex && !isAnswered
                        ? 'cursor-pointer hover:bg-mx-gray-100'
                        : ''
                    }
                    ${setAnswerBoxStyle(index)}
                    ${answerBoxSpacingMatches(contentSize)}`}
                      onClick={() => onSelectAnswer(index)}
                    >
                      <Typography
                        fontTypo={fontAnswerMatches(contentSize, requireSmallSize)}
                        weight="semibold"
                        content={answer.content || `${t('lesson:answer')} ${index + 1}`}
                      />
                    </div>
                  );
                })}
              </div>
            ) : undefined}
          </div>
          <div
            className={`border-mx-gray-200 rounded-b-xl ${
              !isAnswered
                ? 'bg-mx-white flex justify-end'
                : isCorrect
                ? 'bg-mx-green-50'
                : 'bg-mx-red-50'
            } ${marginCheckAnswerMatches(contentSize)}`}
            style={{ borderTop: '1px solid #CFCFCF' }}
          >
            {isAnswered ? (
              <>
                {isCorrect ? (
                  <Typography
                    content={`${t('lesson:correct')}!`}
                    fontTypo={fontBodyMatches(contentSize)}
                    weight="bold"
                    className="text-mx-green-600"
                  />
                ) : (
                  <Typography
                    content={t('lesson:incorrect')}
                    fontTypo={fontBodyMatches(contentSize)}
                    weight="bold"
                    className="text-mx-red-600"
                  />
                )}
                {quizContent.hasExplain ? (
                  <Typography
                    content={quizContent?.explain}
                    fontTypo={fontAnswerMatches(contentSize, true)}
                  />
                ) : undefined}
              </>
            ) : (
              <Button
                type="filled-primary"
                size={buttonActionWithSlideMatches(contentSize)}
                content={
                  <Typography
                    content={t('common:check')}
                    fontTypo={fontBodyMatches(contentSize)}
                    weight="semibold"
                  />
                }
                style={{ width: checkAnswerButtonMatches(contentSize) }}
                onClick={onCheckAnswer}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
  /* eslint-disable */
};
