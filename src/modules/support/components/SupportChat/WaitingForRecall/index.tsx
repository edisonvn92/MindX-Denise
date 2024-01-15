import { Button, Typography } from '@mx/ui';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Loading } from '@/components/Loading/Loading';
import { useAppContext } from '@/core';
import { SupportStatusEnum } from '@/modules/support/helper/SupportStatusEnum';
import { CoreDesignDialog } from '@/components';

interface WaitingForRecallProps {
  supportStatus: SupportStatusEnum;
  handleCancleRecall(): void;
}

const WaitingForRecall = (props: WaitingForRecallProps) => {
  const { t } = useAppContext();
  const { supportStatus, handleCancleRecall } = props;

  const renderContent = () => {
    return (
      <>
        <div className="flex w-full justify-center mb-10">
          <Typography
            fontTypo="heading-m-mobile"
            weight="bold"
            content={t('support:connectingWthStudent')}
          />
        </div>
        <div className="flex w-full justify-center mb-10">
          <Loading sizeProps="large" />
        </div>
        <div className="flex w-full justify-center mb-10 text-center">
          <Typography fontTypo="body-m-desktop" content={t('common:pleaseWaitForASec')} />
        </div>
        <Button
          type="filled-secondary"
          size="medium"
          className="w-full"
          content={
            <Typography content={t('common:cancel')} fontTypo="body-l-desktop" weight="semibold" />
          }
          onClick={handleCancleRecall}
        />
      </>
    );
  };

  return (
    <CoreDesignDialog
      maskClosable={false}
      open={supportStatus === SupportStatusEnum.Waiting}
      onClose={() => {}}
      body={renderContent()}
      className="w-[570px] p-8"
      closeIcon={false}
    />
  );
};

export default WaitingForRecall;
