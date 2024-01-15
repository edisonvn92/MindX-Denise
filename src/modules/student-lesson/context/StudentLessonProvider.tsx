import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useViewModel from '../viewmodels/student-lesson-find-one.viewmodel';
import { PageProvider } from '@/core/context/PageContext';
import { useCoreContext } from '@/core';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const StudentLessonProvider: React.FC<any> = (props: any) => {
  const params = useParams();
  const { id } = params;
  const { children } = props;
  const {
    studentLesson,
    scratchState,
    actionGetStudentLessonById,
    actionGetCurrentScratchState,
    actionUpdateLearningProgress,
    actionTakeQuiz,
    actionUpdateScratchState,
    loading,
    error,
  } = useViewModel();

  const {
    isBlockedMicrophone,
    setIsBlockedMicrophone,
    audioAllowed,
    setAudioAllowed,
    liveBlockRoomId,
    sessionStartLesson,
    supportStatus,
    setSupportStatus,
    isRequestSupportPanelOpened,
    setIsRequestSupportPanelOpened,
    actionCancelSupport,
  } = useCoreContext();

  useEffect(() => {
    if (id) {
      actionGetStudentLessonById(id);
      actionGetCurrentScratchState(id);
    }
  }, []);

  const data = {
    id,
    studentLesson,
    scratchState,
    actionGetStudentLessonById,
    actionGetCurrentScratchState,
    actionUpdateLearningProgress,
    actionTakeQuiz,
    actionUpdateScratchState,
    loading,
    error,
    liveBlockRoomId,
    sessionStartLesson,
    supportStatus,
    isBlockedMicrophone,
    setIsBlockedMicrophone,
    audioAllowed,
    setAudioAllowed,
    setSupportStatus,
    isRequestSupportPanelOpened,
    setIsRequestSupportPanelOpened,
    actionCancelSupport,
  };

  return <PageProvider {...data}>{children}</PageProvider>;
};
