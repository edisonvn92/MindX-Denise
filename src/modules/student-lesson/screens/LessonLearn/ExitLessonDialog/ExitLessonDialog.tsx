import React from 'react';
import { useAppContext } from '@/core';
import { Button, Typography } from '@/mx';
import { CoreDesignDialog, GetIcon } from '@/components';
import './index.scss';

type DialogProps = {
  isOpened: boolean;
  onClickExit(): void;
  onClickContinue(): void;
};

export const ExitLessonDialog: React.FC<DialogProps> = (props: DialogProps) => {
  const { t } = useAppContext();
  const { isOpened, onClickExit, onClickContinue } = props;

  return (
    <CoreDesignDialog
      open={isOpened}
      onClose={onClickContinue}
      closeIcon={
        <div className="fixed top-4 right-4">
          <GetIcon icon="IoCloseOutline" className="w-4 h-4" />
        </div>
      }
      className="exit-dialog"
      title={
        <div className="flex justify-between pb-4 pr-4 border-bottom">
          <Typography
            fontTypo="body-m-desktop"
            weight="bold"
            content={t('lesson:doYouWantToExitLesson')}
          />
        </div>
      }
      footer={
        <div className="w-full flex flex-row-reverse pt-1">
          <Button
            type="filled-primary"
            size="medium"
            content={
              <Typography
                content={t('lesson:continueLesson')}
                fontTypo="body-l-desktop"
                weight="semibold"
              />
            }
            className="ml-2"
            onClick={onClickContinue}
          />
          <Button
            type="outlined-danger"
            size="medium"
            content={
              <Typography content={t('common:exit')} fontTypo="body-l-desktop" weight="semibold" />
            }
            onClick={onClickExit}
          />
        </div>
      }
      body={
        <div className="mt-4 mb-8">
          <Typography fontTypo="body-m-desktop" content={t('lesson:tryToCompleteLesson')} />
        </div>
      }
    />
  );
};
