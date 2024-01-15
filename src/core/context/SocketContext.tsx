/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Button, Typography, useToast } from '@mx/ui';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../hooks';
import { config } from '@/config';
import { EventCommand } from '@/domains/realtime-dashboard/entities';
import { DeleteDialog } from '@/components';

export const socket = io(config.base.socketUrl, { transports: ['websocket'], reconnection: true });
export const SocketContext = React.createContext({} as any);

interface RecallDataTypes {
  action: string;
  detail: {
    mentorName: string;
    liveBlockId: string;
    studentLessonId: string;
    peerId: string;
    supportId: string;
  };
  isAccept?: boolean;
}

export const SocketProvider = (props: any) => {
  const { children } = props;
  const { t, currentUser, permission } = useAppContext();
  const [isOnRecall, setIsOnRecall] = useState<boolean>(false);
  const [recallData, setRecallData] = useState<RecallDataTypes | null>();
  const [toastId, setToastId] = useState<string | any>();
  const [isEndDialogOpened, setIsEndDialogOpened] = useState<boolean>(false);

  const toast = useToast();
  const navigator = useNavigate();

  const getPermission = (): string => {
    if (permission && permission.includes('ROLES.CXO')) return 'CXO';
    if (permission && permission.includes('ROLES.MENTOR')) return 'MENTOR';
    return 'STUDENT';
  };

  const handleAccept = (data: RecallDataTypes) => {
    setRecallData(() => ({ ...data, isAccept: true }));
    navigator(`/student-lesson/${data?.detail.studentLessonId}`);
    toast.deleteToast(toastId);
  };

  const handleReject = (data: RecallDataTypes) => {
    setRecallData(() => ({ ...data, isReject: true }));
    setIsEndDialogOpened(false);
    toast.deleteToast(toastId);
  };

  const renderButtonAction = (data: RecallDataTypes) => {
    return (
      <div className="pt-2 grow flex justify-end">
        <Button
          type="outlined-inverse"
          size="small"
          className="border-mx-white text-mx-white mr-2"
          content={
            <Typography content={t('common:refuse')} fontTypo="body-m-desktop" weight="semibold" />
          }
          onClick={() => setIsEndDialogOpened(true)}
        />
        <Button
          type="filled-inverse"
          size="small"
          className="border-none"
          content={
            <Typography content={t('common:accept')} fontTypo="body-m-desktop" weight="semibold" />
          }
          onClick={() => handleAccept(data)}
        />
      </div>
    );
  };

  useEffect(() => {
    socket.on(EventCommand.Connect, () => {
      console.log('Socket connected');
    });

    if (permission && currentUser?.id) {
      socket.emit(
        EventCommand.UserStatus,
        JSON.stringify({
          uid: currentUser.id,
          role: getPermission(),
          status: 'ONLINE',
        }),
      );
    }

    socket.on('notification', (data: RecallDataTypes) => {
      setRecallData({ ...data });
      const notificationId = toast.addToast({
        status: 'information',
        header: t('support:reCallTitle', { mentorName: data?.detail.mentorName }),
        description: t('support:reCallDescription', { studentName: currentUser.fullName }),
        button: renderButtonAction(data),
        expiringTime: 120000,
        closeIcon: false,
        orientation: 'vertical',
        onCloseToast: () => handleReject(data),
      });
      setToastId(notificationId);
    });

    socket.on(EventCommand.Disconnect, () => {
      toast.addToast({
        status: 'error',
        header: 'Error',
        description: t('common:somethingWentWrong'),
      });

      if (permission && currentUser?.id) {
        socket.emit(
          EventCommand.UserStatus,
          JSON.stringify({
            uid: currentUser.id,
            role: getPermission(),
            status: 'OFFLINE',
          }),
        );
      }
    });
  }, [currentUser]);

  const data = {
    isOnRecall,
    setIsOnRecall,
    recallData,
    setRecallData,
  };

  return (
    <SocketContext.Provider value={data}>
      <DeleteDialog
        title={t('support:doYouWantToEndSupportSession')}
        isOpened={isEndDialogOpened}
        onDelete={() => recallData && handleReject(recallData)}
        onClose={() => setIsEndDialogOpened(false)}
        deleteBtnLabel={t('common:end')}
        deleteBtnClassName="w-auto"
        className="delete-dialog"
      />
      {children}
    </SocketContext.Provider>
  );
};
