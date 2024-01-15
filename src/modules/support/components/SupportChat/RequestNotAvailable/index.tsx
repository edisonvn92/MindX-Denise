import React from 'react';
import { Button, Typography } from '@mx/ui';
import { CoreDesignDialog, GetIcon } from '@/components';
import { useAppContext } from '@/core';

interface RequestNotAvailableProps {
  isErrorOnRecall: boolean;
  setIsErrorOnRecall: React.Dispatch<React.SetStateAction<boolean>>;
}

const RequestNotAvailable = (props: RequestNotAvailableProps) => {
  const { t } = useAppContext();
  const { isErrorOnRecall, setIsErrorOnRecall } = props;

  const onClickCancel = () => {
    setIsErrorOnRecall(false);
  };

  const renderContent = () => {
    return (
      <>
        <div className="mt-4 mb-6">
          <Typography fontTypo="body-s-desktop" content={t('support:requestWasSupported')} />
        </div>
        <div className="mb-8">
          <Typography fontTypo="body-s-desktop" content={t('support:dependOnDelayTime')} />
        </div>
      </>
    );
  };

  return (
    <CoreDesignDialog
      maskClosable={false}
      open={isErrorOnRecall}
      onClose={() => setIsErrorOnRecall(false)}
      title={
        <div className="flex justify-between pb-4 pr-4 border-bottom">
          <Typography
            fontTypo="body-m-desktop"
            weight="bold"
            content={t('support:thisRequestWasNotAvailable')}
          />
        </div>
      }
      body={renderContent()}
      footer={
        <div className="w-full flex justify-end pt-1">
          <Button
            type="filled-primary"
            size="medium"
            content={
              <Typography
                content={t('common:backToMain')}
                fontTypo="body-l-desktop"
                weight="semibold"
              />
            }
            className="mr-2"
            onClick={onClickCancel}
          />
        </div>
      }
      className="w-[416px] p-6"
      closeIcon={
        <div className="fixed top-7 right-7">
          <GetIcon icon="IoCloseOutline" className="w-4 h-4" />
        </div>
      }
    />
  );
};

export default RequestNotAvailable;
