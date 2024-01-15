import React from 'react';
import Lottie from 'react-lottie';
import { Button, Typography } from '@mx/ui';
import { useAppContext, useCoreContext } from '@/core';
import { SupportStatusEnum } from '@/modules/support/helper/SupportStatusEnum';
import searchingMentorAnimation from '@/assets/lotties/Searching-mentor.json';

export const RequestSupportWaitingScreen: React.FC = () => {
  const { t } = useAppContext();
  const { actionCancelSupport, setSupportStatus, setIsRequestSupportPanelOpened } =
    useCoreContext();

  const onClickCancel = () => {
    actionCancelSupport();
    setIsRequestSupportPanelOpened(false);
    setSupportStatus(SupportStatusEnum.NotStarted);
  };

  return (
    <>
      <div className="flex w-full justify-center mb-10">
        <Typography
          fontTypo="heading-m-mobile"
          weight="bold"
          content={t('support:searchingMentor')}
        />
      </div>
      <div className="flex w-full justify-center mb-10">
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: searchingMentorAnimation,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice',
            },
          }}
          height={256}
          width={320}
        />
      </div>
      <div className="flex w-full justify-center mb-10">
        <Typography
          fontTypo="body-m-desktop"
          content={t('support:canContinueStudyingWhileRequesting')}
        />
      </div>

      <Button
        type="filled-primary"
        size="medium"
        className="w-full mb-1"
        content={
          <Typography
            content={t('support:continueStudying')}
            fontTypo="body-l-desktop"
            weight="semibold"
          />
        }
        onClick={() => setIsRequestSupportPanelOpened(false)}
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
