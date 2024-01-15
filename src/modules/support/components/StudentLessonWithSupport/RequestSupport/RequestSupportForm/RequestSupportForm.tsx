import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Typography } from '@mx/ui';
import { useAppContext, useCoreContext } from '@/core';
import { StudentLessonEntity, StudentPageCoverContent } from '@/domains/student-lesson/entities';
import { SupportStatusEnum } from '@/modules/support/helper/SupportStatusEnum';

export const RequestSupportForm: React.FC = () => {
  const { t } = useAppContext();
  const { requestSupportForm, onSubmitRequest, setSupportStatus, setIsRequestSupportPanelOpened } =
    useCoreContext();

  const { setValue } = requestSupportForm;
  const { state } = useLocation();
  const studentLessonData = JSON.parse(
    sessionStorage.getItem('studentLesson') || '{}',
  ) as StudentLessonEntity;
  const currentPageIndex = JSON.parse(sessionStorage.getItem('currentLessonPage') || '0') as number;
  const isEditorShown = JSON.parse(sessionStorage.getItem('isEditorShown') || 'false') as boolean;
  const currentPageName = isEditorShown
    ? t('support:practiceSession')
    : studentLessonData.learningProgresses![currentPageIndex].pageName ||
      (studentLessonData.learningProgresses![currentPageIndex].content as StudentPageCoverContent)
        .lessonName;

  useEffect(() => {
    setValue('courseId', studentLessonData.courseId);
    setValue('lessonId', studentLessonData.lessonId);
    setValue(
      'question',
      `${t('support:iAmStudentInCourse')} ${state.courseName}, ${t('support:studyingLesson')} ${
        state.lesson.name
      }, ${t('support:needSupportIn')} ${currentPageName}`,
    );
  }, []);

  const onClickGoBack = () => {
    setIsRequestSupportPanelOpened(false);
    setSupportStatus(SupportStatusEnum.NotStarted);
  };

  return (
    <>
      <div className="flex mb-6">
        <Typography
          fontTypo="body-xl-desktop"
          weight="bold"
          content={
            <p className="text-[20px]">
              {t('support:iAmStudentInCourse')}{' '}
              <span className="text-mx-blue-600">{state?.courseName}</span>,{' '}
              {t('support:studyingLesson')}{' '}
              <span className="text-mx-blue-600">{state?.lesson.name}</span>,{' '}
              {t('support:needSupportIn')}{' '}
              <span className="text-mx-blue-600">{currentPageName}</span>
            </p>
          }
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Button
          type="outlined-primary"
          size="medium"
          content={
            <Typography content={t('common:goBack')} fontTypo="body-l-desktop" weight="semibold" />
          }
          onClick={() => onClickGoBack()}
        />
        <Button
          type="filled-primary"
          size="medium"
          content={
            <Typography
              content={t('support:requestSupport')}
              fontTypo="body-l-desktop"
              weight="semibold"
            />
          }
          onClick={() => onSubmitRequest()}
        />
      </div>
    </>
  );
};
