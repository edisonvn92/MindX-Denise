import React from 'react';
import { Button, Typography } from '@mx/ui';
import Lottie from 'react-lottie';
import { useAppContext, useCoreContext } from '@/core';
import { SupportStatusEnum } from '@/modules/support/helper/SupportStatusEnum';
import notFoundAnimation from '@/assets/lotties/Not-found.json';

export const RequestSupportExpiredScreen: React.FC = () => {
  const { t } = useAppContext();
  const { actionCancelSupport, setSupportStatus, setIsRequestSupportPanelOpened, onSubmitRequest } =
    useCoreContext();

  const onClickCancel = () => {
    setIsRequestSupportPanelOpened(false);
    actionCancelSupport();
    setSupportStatus(SupportStatusEnum.NotStarted);
  };

  return (
    <>
      <div className="flex w-full justify-center mb-10">
        <Typography
          fontTypo="heading-m-mobile"
          weight="bold"
          content={t('support:mentorNotFound')}
        />
      </div>
      <div className="flex w-full justify-center mb-10">
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: notFoundAnimation,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice',
            },
          }}
          height={256}
          width={320}
        />
      </div>
      <div className="flex w-full justify-center mb-10 text-center">
        <Typography fontTypo="body-m-desktop" content={t('support:mentorNotFoundHelpText')} />
      </div>
      <Button
        type="filled-primary"
        size="medium"
        className="w-full border-none mb-2"
        content={
          <Typography content={t('common:tryAgain')} fontTypo="body-l-desktop" weight="semibold" />
        }
        onClick={() => onSubmitRequest()}
      />
      <Button
        type="filled-secondary"
        size="medium"
        className="w-full"
        content={
          <Typography content={t('common:cancel')} fontTypo="body-l-desktop" weight="semibold" />
        }
        onClick={() => onClickCancel()}
      />
    </>
  );
};
