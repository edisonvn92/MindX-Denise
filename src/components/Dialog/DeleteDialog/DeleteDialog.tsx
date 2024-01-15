import React from 'react';
import { GetIcon } from '../../Icons/Icons';
import { CoreDesignDialog } from '../Dialog';
import { useAppContext } from '@/core';
import { Button, Typography } from '@/mx';
import './index.scss';

type DeleteDialogProps = {
  title: string;
  body?: string;
  isOpened: boolean;
  className?: string;
  deleteBtnLabel?: string;
  deleteBtnClassName?: string;
  onDelete(): void;
  onClose(): void;
};

export const DeleteDialog: React.FC<DeleteDialogProps> = (props: DeleteDialogProps) => {
  const { t } = useAppContext();
  const {
    title,
    body = t('common:thisActionIsIrreversible'),
    isOpened,
    deleteBtnLabel = t('common:delete'),
    deleteBtnClassName = 'w-20',
    className = 'default-width',
    onDelete,
    onClose,
  } = props;

  return (
    <CoreDesignDialog
      open={isOpened}
      onClose={onClose}
      closeIcon={
        <div className="fixed top-4 right-4">
          <GetIcon icon="IoCloseOutline" className="w-4 h-4" />
        </div>
      }
      className={className}
      title={
        <div className="flex justify-between pb-4 pr-4 border-bottom">
          <Typography fontTypo="body-m-desktop" weight="bold" content={title} />
        </div>
      }
      footer={
        <div className="w-full flex justify-end pt-1">
          <Button
            type="outlined-primary"
            size="medium"
            content={
              <Typography
                content={t('common:cancel')}
                fontTypo="body-l-desktop"
                weight="semibold"
              />
            }
            className="w-20 mr-2"
            onClick={onClose}
          />
          <Button
            type="filled-danger"
            size="medium"
            content={
              <Typography content={deleteBtnLabel} fontTypo="body-l-desktop" weight="semibold" />
            }
            className={`border-none whitespace-nowrap ${deleteBtnClassName}`}
            onClick={onDelete}
          />
        </div>
      }
      body={
        <div className="mt-4 mb-8">
          <Typography fontTypo="body-m-desktop" content={body} />
        </div>
      }
    />
  );
};
