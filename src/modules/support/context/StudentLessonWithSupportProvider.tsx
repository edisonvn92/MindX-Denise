import React from 'react';
import useViewModel from '../viewmodels/student-lesson-with-support.viewmodel';
import { PageProvider } from '@/core/context/PageContext';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const StudentLessonWithSupportProvider: React.FC<any> = (props: any) => {
  const { children } = props;
  const {
    requestSupportForm,
    actionCancelSupport,
    onSubmitRequest,
    supportId,
    supportStatus,
    isRequestSupportPanelOpened,
    setIsRequestSupportPanelOpened,
    setSupportStatus,
    currentPeerId,
    handleStartSession,
    chatForm,
    chatContentList,
    setChatContentList,
    actionEnterChat,
    chatPrefixList,
    localStream,
    remoteStream,
    actionRateSession,
    liveBlockRoomId,
    setLiveBlockRoomId,
    sessionTimeLeft,
    sessionStartLesson,
    audioAllowed,
    setAudioAllowed,
    isBlockedMicrophone,
    setIsBlockedMicrophone,
    showDialog,
    errorDetails,
    setShowDialog,
  } = useViewModel();

  const data = {
    requestSupportForm,
    actionCancelSupport,
    onSubmitRequest,
    supportId,
    supportStatus,
    isRequestSupportPanelOpened,
    setIsRequestSupportPanelOpened,
    setSupportStatus,
    currentPeerId,
    handleStartSession,
    chatForm,
    chatContentList,
    setChatContentList,
    actionEnterChat,
    chatPrefixList,
    localStream,
    remoteStream,
    actionRateSession,
    liveBlockRoomId,
    setLiveBlockRoomId,
    sessionTimeLeft,
    sessionStartLesson,
    audioAllowed,
    setAudioAllowed,
    isBlockedMicrophone,
    setIsBlockedMicrophone,
    showDialog,
    errorDetails,
    setShowDialog,
  };

  return <PageProvider {...data}>{children}</PageProvider>;
};
