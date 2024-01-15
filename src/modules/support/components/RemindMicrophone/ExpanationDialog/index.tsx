import React from 'react';
import { Button, Typography } from '@mx/ui';
import { DialogType } from '../MediaOnboardingDialog';
import { CoreDesignDialog, GetIcon } from '@/components';
import { useAppContext } from '@/core';

import './index.scss';

type ExpanationDialogProps = {
  showDialog: DialogType;
  setAudioAllowed: React.Dispatch<React.SetStateAction<boolean>>;
  onCloseDialog(): void;
};

const ExpanationDialog = (props: ExpanationDialogProps) => {
  const { showDialog, setAudioAllowed, onCloseDialog } = props;
  const { t } = useAppContext();

  const handleAllowedMicrophone = () => {
    setAudioAllowed(true);
  };

  return (
    <CoreDesignDialog
      className="remind-microphone light03 p-6"
      open={!!showDialog}
      onClose={() => onCloseDialog()}
      maskClosable={false}
      closeIcon={false}
      title={
        <div className="flex justify-between pb-4 border-bottom">
          <Typography
            fontTypo="body-m-desktop"
            weight="bold"
            content={t('support:wantToAllowMicrophone')}
          />
        </div>
      }
      body={
        <div className="flex w-full justify-start pt-4 pb-10">
          <Typography fontTypo="body-s-desktop" content={t('support:canBeTurnedOff')} />
        </div>
      }
      footer={
        <>
          <Button
            type="filled-primary"
            size="medium"
            className="w-full p-3 border-none mb-2"
            content={
              <Typography
                content={t('support:allowsMicrophone')}
                fontTypo="body-l-desktop"
                weight="semibold"
              />
            }
            onClick={() => handleAllowedMicrophone()}
          />
          <Button
            type="filled-secondary"
            size="medium"
            className="w-full p-3 border-none"
            content={
              <Typography
                content={t('support:continueWithoutMicrophone')}
                fontTypo="body-l-desktop"
                weight="semibold"
              />
            }
            onClick={() => onCloseDialog()}
          />
        </>
      }
    />
  );
};

export default ExpanationDialog;
