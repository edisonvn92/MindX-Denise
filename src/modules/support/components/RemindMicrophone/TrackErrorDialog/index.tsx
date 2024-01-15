import React from 'react';
import { Typography } from '@mx/ui';
import { DialogProps } from '../MediaOnboardingDialog';
import { CoreDesignDialog, GetIcon } from '@/components';
import allowedMicrophone from '@/assets/images/allow-microphone.png';
import './index.scss';
import { useAppContext } from '@/core';

const TrackErrorDialog = (props: DialogProps) => {
  const { errorDetails, onCloseDialog } = props;
  const { t } = useAppContext();
  return (
    <CoreDesignDialog
      className="user-denied light03"
      open={!!errorDetails}
      onClose={() => onCloseDialog()}
      maskClosable
      closeIcon={
        <div className="fixed top-4 right-4">
          <GetIcon icon="IoCloseOutline" className="w-6 h-6" />
        </div>
      }
      body={
        <div className="flex">
          <img src={allowedMicrophone} alt="allowedMicrophone" className="mr-5 grow-1" />
          <div className="flex flex-col justify-center grow-1">
            <Typography
              className="mb-3"
              fontTypo="heading-s-desktop"
              content={t('support:guideAllowed')}
            />
            <Typography fontTypo="body-s-desktop" content={t('support:canTurnOff')} />
          </div>
        </div>
      }
    />
  );
};

export default TrackErrorDialog;
