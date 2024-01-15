import React, { useEffect, useState } from 'react';
import useViewModel from '../viewmodels/support-list.viewmodel';
import useSupportChatModel from '../viewmodels/support-chat.viewmodel';
import { PageProvider } from '@/core/context/PageContext';
import { FindSupportByMentorIdInput } from '@/domains/support/ports/payloads';
import { useAppContext } from '@/core';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SupportListProvider = (props: any) => {
  const { children } = props;
  const { currentUser } = useAppContext();
  const {
    supportList,
    actionGetSupportByMentorId,
    actionRejectRequestSupport,
    actionAcceptRequestSupport,
    actionRecallSupport,
    actionCancelRecallSupport,
    loading,
    error,
  } = useViewModel();
  const [isDetailDialogOpened, setIsDetailDialogOpened] = useState<boolean>(false);
  const payload: FindSupportByMentorIdInput = {
    isCompleted: false,
    mentorUid: currentUser?.id || '',
  };

  useEffect(() => {
    actionGetSupportByMentorId(payload);
  }, []);

  const { onRecallRequest, recallSupportId, currentPeerId, supportStatus } = useSupportChatModel();

  const data = {
    supportList,
    actionGetSupportByMentorId,
    actionRejectRequestSupport,
    actionAcceptRequestSupport,
    actionRecallSupport,
    actionCancelRecallSupport,
    isDetailDialogOpened,
    setIsDetailDialogOpened,
    loading,
    error,
    onRecallRequest,
    recallSupportId,
    currentPeerId,
    supportStatus,
  };

  return <PageProvider {...data}>{children}</PageProvider>;
};
