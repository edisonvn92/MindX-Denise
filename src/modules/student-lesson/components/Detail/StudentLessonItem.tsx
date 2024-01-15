import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mx/ui';
import { useAppContext, useCoreContext } from '@/core';
import { LessonStatus, StudentLessonEntity } from '@/domains/student-lesson/entities';
import { GetIcon } from '@/components';

interface StudentLessonItemProps {
  lesson: StudentLessonEntity;
  isCurrentLesson: boolean;
}
export const StudentLessonItem: React.FC<StudentLessonItemProps> = (
  props: StudentLessonItemProps,
) => {
  const { t } = useAppContext();
  const { courseDetail } = useCoreContext();
  const { lesson, isCurrentLesson } = props;
  const [isHover, setIsHover] = useState<boolean>(false);
  const navigate = useNavigate();

  const isMobileDevice = /android|iphone|kindle|ipad/i.test(navigator.userAgent);

  const getIconNameByStatus = (status: string) => {
    switch (status) {
      case LessonStatus.Completed:
        return 'IoCheckmarkCircle';
      case LessonStatus.Inprogress:
        return 'IoPlayCircle';
      case LessonStatus.NotStarted:
        return 'IoPlayCircle';
      default:
        return 'IoPlayCircle';
    }
  };

  const getIconClassNameByStatus = (status: string) => {
    switch (status) {
      case LessonStatus.Completed:
        return 'text-mx-green-600 mr-2 mt-1 w-5 h-5';
      case LessonStatus.Inprogress:
        return 'text-mx-blue-600 mr-2 mt-1 w-5 h-5';
      case LessonStatus.NotStarted:
        return 'text-mx-gray-600 mr-2 mt-1 w-5 h-5';
      default:
        return 'text-mx-gray-600 mr-2 mt-1 w-5 h-5';
    }
  };

  const onClickOpenStudentLesson = (id: string) => {
    navigate(`/student-lesson/${id}`, {
      state: { courseName: courseDetail?.name, lesson: lesson?.lesson, courseId: courseDetail?.id },
    });
  };

  const getActionButtonNameOfItem = () => {
    switch (lesson.status) {
      case LessonStatus.NotStarted:
        return t('common:start');
      case LessonStatus.Inprogress:
        return t('common:continue');
      case LessonStatus.Completed:
        return t('common:review');
      default:
        return t('common:start');
    }
  };

  return (
    /* eslint-disable */
    <div
      className={`w-full flex rounded-lg p-4 ${
        isCurrentLesson ? 'bg-mx-blue-100' : isHover ? 'bg-mx-blue-100' : ''
      }`}
      style={{
        transition: '0.5s',
        wordBreak: 'break-word',
      }}
      onMouseEnter={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
      onClick={() => {
        if (isMobileDevice) onClickOpenStudentLesson(lesson.id);
      }}
    >
      <div className="flex m-auto grow justify-start">
        <GetIcon
          icon={getIconNameByStatus(lesson.status)}
          className={getIconClassNameByStatus(lesson.status)}
        />
        <div>
          <Typography content={`${lesson.lesson!.name}`} fontTypo="body-l-desktop" weight="bold" />
          <Typography
            content={t('course:minutesStudy', { min: lesson.lesson!.learnTime })}
            fontTypo="body-s-desktop"
            className="text-mx-gray-600"
          />
        </div>
      </div>
      {!isMobileDevice ? (
        <div
          style={{
            opacity: isCurrentLesson || isHover ? 1 : 0,
            transition: 'all 0.5s',
          }}
        >
          <Button
            type="filled-primary"
            size="medium"
            content={
              <Typography
                content={getActionButtonNameOfItem()}
                fontTypo="body-l-desktop"
                weight="semibold"
              />
            }
            className="w-200 h-12 hover:h-12"
            onClick={() => onClickOpenStudentLesson(lesson.id)}
          />
        </div>
      ) : undefined}

      <div />
    </div>
  );
  /* eslint-disable */
};
