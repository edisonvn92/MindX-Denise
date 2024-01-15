/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExitLessonDialog } from './ExitLessonDialog/ExitLessonDialog';
import StudentLessonNavbar from './StudentLessonNavbar';
import { SupportStatusEnum } from '@/modules/support/helper/SupportStatusEnum';
import { LiveBlockRoomScreen } from '@/modules/liveblock-room/screens/LiveBlockRoomScreen';
import { useDataLayerAction } from '@/core/context/TagContext';
import { useAppContext, useCoreContext } from '@/core';

export const LessonLearnScreen: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAppContext();
  const dataLayerAction = useDataLayerAction();
  const { liveBlockRoomId, supportStatus, sessionStartLesson, studentLesson, actionCancelSupport } =
    useCoreContext();
  const [isExitDialogOpened, setIsExitDialogOpened] = useState<boolean>(false);
  const exitToCourse = () => {
    dataLayerAction({
      event: 'LEARN',
      data: {
        user_id: currentUser.id,
        learning_time: (new Date().getTime() - sessionStartLesson) / 1000 / 60 / 60,
      },
    });
    actionCancelSupport();
    navigate(`/student-courses/${studentLesson.courseId}`);
  };

  useEffect(() => {
    const handleEscapeEvent = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape' && studentLesson && supportStatus !== SupportStatusEnum.Started) {
        setIsExitDialogOpened(true);
      }
    };
    document.addEventListener('keyup', handleEscapeEvent);
    return () => document.removeEventListener('keyup', handleEscapeEvent);
  }, [studentLesson, supportStatus]);

  return (
    <>
      <StudentLessonNavbar setIsExitDialogOpened={setIsExitDialogOpened} />
      <LiveBlockRoomScreen liveBlockRoomId={liveBlockRoomId} />
      <ExitLessonDialog
        isOpened={isExitDialogOpened}
        onClickExit={exitToCourse}
        onClickContinue={() => setIsExitDialogOpened(false)}
      />
    </>
  );
};
