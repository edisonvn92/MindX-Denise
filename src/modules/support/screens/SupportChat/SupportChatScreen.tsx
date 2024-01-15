import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mx/ui';
import { SupportStatusEnum } from '../../helper/SupportStatusEnum';
import {
  EndSupportScreen,
  SessionTimeToast,
  SupportEditorScreen,
  SupportFloatPanel,
} from '../../components';
import WaitingForRecall from '../../components/SupportChat/WaitingForRecall';
import { MediaOnboardingDialog } from '../../components/RemindMicrophone';
import { CoreDesignDialog, DeleteDialog } from '@/components';
import { useAppContext, useCoreContext } from '@/core';
import { socket } from '@/core/context/SocketContext';
import { EventCommand } from '@/domains/realtime-dashboard/entities';

interface SupportChatProps {
  isSupported?: boolean;
  mainScreen?: React.ReactNode;
}

export const SupportChatScreen: React.FC<SupportChatProps> = (props: SupportChatProps) => {
  const { isSupported = false, mainScreen } = props;
  const { t } = useAppContext();
  const {
    supportStatus,
    setSupportStatus,
    handleStartMentorSession,
    actionFinishSupport,
    actionCancelRecall,
  } = useCoreContext();
  const [isEndDialogOpened, setIsEndDialogOpened] = useState<boolean>(false);
  const [isRejectByStudent, setIsRejectByStudent] = useState<boolean>(false);
  const { state } = useLocation();
  const navigate = useNavigate();

  const onEndSupportSession = async () => {
    setIsEndDialogOpened(false);
    await actionFinishSupport(false);
  };

  const handleCancleRecall = async () => {
    await actionCancelRecall();
    navigate('/support', { preventScrollReset: true });
  };

  useEffect(() => {
    if (!mainScreen && !state?.isRecall) {
      handleStartMentorSession();
    }
  }, []);

  useEffect(() => {
    socket.on(EventCommand.SupportMentor, () => {
      setIsRejectByStudent(true);
      setSupportStatus(SupportStatusEnum.NotStarted);
    });
  }, []);

  const showWaitingForRecallDialog = () => {
    if (state?.isRecall && supportStatus === SupportStatusEnum.Waiting) {
      return (
        <WaitingForRecall supportStatus={supportStatus} handleCancleRecall={handleCancleRecall} />
      );
    }

    return undefined;
  };

  const showRejectByStudentDialog = () => {
    if (isRejectByStudent) {
      return (
        <CoreDesignDialog
          maskClosable={false}
          open={isRejectByStudent}
          onClose={() => setIsRejectByStudent(false)}
          body={
            <>
              <div className="flex w-full justify-center text-center mb-10">
                <Typography
                  fontTypo="heading-m-mobile"
                  weight="bold"
                  content={t('support:studentWasRejectRequest')}
                />
              </div>
              <Button
                type="outlined-secondary"
                size="medium"
                className="w-full text-center"
                content={
                  <Typography
                    content={t('common:cancel')}
                    fontTypo="body-l-desktop"
                    weight="semibold"
                  />
                }
                onClick={handleCancleRecall}
              />
            </>
          }
          className="w-[570px] p-8"
          closeIcon={false}
        />
      );
    }

    return undefined;
  };

  const showFloattingSupportPanel = () => {
    if (
      [
        SupportStatusEnum.Started,
        SupportStatusEnum.MentorFound,
        SupportStatusEnum.WaitingRating,
      ].includes(supportStatus)
    ) {
      return (
        <>
          <SessionTimeToast />
          <SupportFloatPanel
            setIsEndDialogOpened={setIsEndDialogOpened}
            isMentor={!(mainScreen as boolean)}
          />
          <MediaOnboardingDialog />
        </>
      );
    }

    return undefined;
  };
  return (
    <div className="h-screen w-screen flex flex-col">
      {supportStatus === SupportStatusEnum.WaitingRating ? (
        <div className="bg-mx-white h-full flex grow flex-col flex-wrap overflow-hidden overlay-screen z-[9999]">
          <EndSupportScreen isStudent={Boolean(mainScreen)} />
        </div>
      ) : undefined}
      {showWaitingForRecallDialog()}
      {showRejectByStudentDialog()}
      {mainScreen || <SupportEditorScreen />}
      {showFloattingSupportPanel()}

      <DeleteDialog
        title={t('support:doYouWantToEndSupportSession')}
        isOpened={isEndDialogOpened}
        onDelete={onEndSupportSession}
        onClose={() => setIsEndDialogOpened(false)}
        deleteBtnLabel={t('common:end')}
        deleteBtnClassName="w-auto"
      />
    </div>
  );
};
