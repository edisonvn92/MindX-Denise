import React from 'react';
import useViewModel from '../viewmodels/support-chat.viewmodel';
import useViewStudentLessonModel from '../../student-lesson/viewmodels/student-lesson-find-one.viewmodel';
import { PageProvider } from '@/core/context/PageContext';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SupportChatProvider = (props: any) => {
  const { children } = props;
  const {
    supportStatus,
    setSupportStatus,
    chatForm,
    chatContentList,
    actionEnterChat,
    actionFinishSupport,
    handleStartMentorSession,
    currentPeerId,
    handleConnectOtherPeer,
    chatPrefixList,
    localStream,
    remoteStream,
    liveBlockRoomId,
    sessionTimeLeft,
    isTeacher,
    audioAllowed,
    setAudioAllowed,
    isBlockedMicrophone,
    setIsBlockedMicrophone,
    actionCancelRecall,
    showDialog,
    errorDetails,
    setShowDialog,
  } = useViewModel();

  const { actionUpdateScratchState } = useViewStudentLessonModel();
  const data = {
    supportStatus,
    setSupportStatus,
    chatForm,
    chatContentList,
    actionEnterChat,
    actionFinishSupport,
    handleStartMentorSession,
    currentPeerId,
    handleConnectOtherPeer,
    chatPrefixList,
    localStream,
    remoteStream,
    liveBlockRoomId,
    sessionTimeLeft,
    actionUpdateScratchState,
    isTeacher,
    audioAllowed,
    setAudioAllowed,
    isBlockedMicrophone,
    setIsBlockedMicrophone,
    actionCancelRecall,
    showDialog,
    errorDetails,
    setShowDialog,
  };

  return <PageProvider {...data}>{children}</PageProvider>;
};
