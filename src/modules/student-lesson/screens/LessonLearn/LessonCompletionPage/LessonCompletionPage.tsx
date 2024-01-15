import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from '@/mx';
import { useAppContext, useCoreContext } from '@/core';
import './index.scss';
import { useDataLayerAction } from '@/core/context/TagContext';
import { GetIcon } from '@/components';

export const LessonCompletionPage: React.FC = () => {
  const { t, currentUser } = useAppContext();
  const { studentLesson, sessionStartLesson } = useCoreContext();
  const navigate = useNavigate();
  const dataLayerAction = useDataLayerAction();

  const goBackToHomePage = () => {
    // Calculate the lesson session duration and push it onto the GTM
    dataLayerAction({
      event: 'LEARN',
      data: {
        user_id: currentUser.id,
        learning_time: (new Date().getTime() - sessionStartLesson) / 1000 / 60 / 60,
      },
    });

    navigate('/student-courses');
  };
  const onClickContinue = () => {
    navigate(`../${studentLesson.nextStudentLessonId}`, {
      state: {
        courseName: studentLesson?.courseName,
        lesson: studentLesson?.nextLesson,
        courseId: studentLesson?.courseId,
      },
    });
    navigate(0);
  };
  return (
    <div className="w-full h-full flex flex-col justify-center">
      {studentLesson.nextLesson && studentLesson.nextStudentLessonId ? (
        <div className="rounded-xl border border-solid border-mx-gray-200 bg-mx-white light03 p-8 m-auto lesson-completion">
          <Typography
            fontTypo="heading-s-mobile"
            content={t('lesson:youAreDoingGreat')}
            weight="bold"
            className="mb-2"
          />
          <Typography
            fontTypo="body-m-desktop"
            content={t('lesson:continueToNextLesson')}
            className="mb-10"
          />
          <div className="rounded-lg w-full bg-mx-gray-100 mb-10 p-4">
            <div className="flex">
              <GetIcon icon="IoPlayCircleOutline" className="w-4 h-4 mr-2 mt-1" />
              <div>
                <Typography
                  fontTypo="body-l-desktop"
                  content={studentLesson.nextLesson.name}
                  weight="semibold"
                />

                <Typography
                  content={t('course:minutesStudy', { min: studentLesson.nextLesson.learnTime })}
                  fontTypo="body-s-desktop"
                  className="text-mx-gray-600"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button
              type="outlined-primary"
              size="medium"
              content={
                <Typography
                  content={t('common:backToHomePage')}
                  fontTypo="body-l-desktop"
                  weight="semibold"
                />
              }
              onClick={goBackToHomePage}
            />
            <Button
              type="filled-primary"
              size="medium"
              content={
                <Typography
                  content={t('lesson:continueLearning')}
                  fontTypo="body-l-desktop"
                  weight="semibold"
                />
              }
              onClick={onClickContinue}
            />
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-solid border-mx-gray-200 bg-mx-white light03 p-8 m-auto course-completion">
          <Typography
            fontTypo="heading-s-mobile"
            content={t('lesson:youHaveCompletedTheCourse')}
            weight="bold"
            className="mb-2"
          />
          <Typography
            fontTypo="body-m-desktop"
            content={t('lesson:congratulateForCompletingCourse')}
            className="mb-10"
          />
          <Button
            type="outlined-primary"
            size="medium"
            className="w-full"
            content={
              <Typography
                content={t('common:backToHomePage')}
                fontTypo="body-l-desktop"
                weight="semibold"
              />
            }
            onClick={goBackToHomePage}
          />
        </div>
      )}
    </div>
  );
};
