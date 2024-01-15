import { Typography } from '@mx/ui';
import React from 'react';
import { DialogProps } from '../MediaOnboardingDialog';
import { CoreDesignDialog, GetIcon } from '@/components';
import { useAppContext } from '@/core';
import unblockedMicrophone from '@/assets/images/unblocked-microphone.png';
import './index.scss';

const UserDeniedDialog = (props: DialogProps) => {
  const { errorDetails, onCloseDialog } = props;

  const { t } = useAppContext();
  return (
    <div>
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
            <img src={unblockedMicrophone} alt="unblocked" className="mr-12 grow-1" />
            <div className="flex flex-col justify-center grow-1">
              <Typography
                className="mb-4 border-bottom pb-4"
                fontTypo="heading-s-desktop"
                content={t('support:microphoneHasBeenBlocked')}
              />
              <Typography fontTypo="body-s-desktop" content={t('support:stepUnblocked1')} />
              <Typography fontTypo="body-s-desktop" content={t('support:stepUnblocked2')} />
            </div>
          </div>
        }
      />
    </div>
  );
};

export default UserDeniedDialog;
