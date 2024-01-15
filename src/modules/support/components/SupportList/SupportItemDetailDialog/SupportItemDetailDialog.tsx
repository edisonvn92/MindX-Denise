import React from 'react';
import { useAppContext, useCoreContext } from '@/core';
import { Button, Typography } from '@/mx';
import { SupportEntity } from '@/domains/support/entities';
import { CoreDesignDialog } from '@/components';

interface DetailProps {
  detail: SupportEntity | any;
  onClickAccept?(supportItem: SupportEntity | any): void;
  //   onSubmitSuccessfully(): void;
}

export const SupportItemDetailDialog: React.FC<DetailProps> = (props: DetailProps) => {
  const { t } = useAppContext();
  const { detail, onClickAccept } = props;
  const { isDetailDialogOpened, setIsDetailDialogOpened } = useCoreContext();
  const supportTime = 15;

  const onClickCancel = () => {
    setIsDetailDialogOpened(false);
  };

  return (
    <CoreDesignDialog
      open={isDetailDialogOpened}
      onClose={() => setIsDetailDialogOpened(false)}
      closeIcon={null}
      className="w-[496px]"
      title={
        <Typography
          fontTypo="body-xxl-desktop"
          weight="semibold"
          content={t('support:inquiryDetail')}
          className="mb-4"
        />
      }
      footer={
        <div className="grid grid-cols-2 gap-2 pt-4">
          <Button
            type="outlined-primary"
            size="large"
            content={
              <Typography
                content={t('common:goBack')}
                fontTypo="body-xl-desktop"
                weight="semibold"
              />
            }
            onClick={onClickCancel}
          />
          {onClickAccept && (
            <Button
              type="filled-primary"
              size="large"
              content={
                <Typography
                  content={t('common:accept')}
                  fontTypo="body-xl-desktop"
                  weight="semibold"
                />
              }
              onClick={() => onClickAccept(detail)}
            />
          )}
        </div>
      }
      body={
        <>
          <div className="border border-solid border-mx-gray-200 rounded-xl p-2 flex mb-4">
            {detail?.studentAvatar ? (
              <img
                src={detail.studentAvatar}
                alt="student avatar"
                className="object-cover rounded-full w-8 h-8 mr-2"
              />
            ) : (
              <div className="rounded-full w-8 h-8 mr-2 avatar-filler" />
            )}
            <Typography
              fontTypo="body-m-desktop"
              content={detail?.studentName}
              className="mt-0.5"
            />
          </div>

          <div className="border border-solid border-mx-gray-200 rounded-xl p-2">
            <div className="mb-10">
              <Typography
                content={t('common:course')}
                fontTypo="body-s-desktop"
                weight="semibold"
              />
              <Typography content={detail?.courseName} fontTypo="body-s-desktop" />
            </div>
            <div className="mb-10">
              <Typography
                content={t('common:lesson')}
                fontTypo="body-s-desktop"
                weight="semibold"
              />
              <Typography content={detail?.lessonName} fontTypo="body-s-desktop" />
            </div>

            <div className="mb-10">
              <Typography
                content={t('support:inquiry')}
                fontTypo="body-s-desktop"
                weight="semibold"
              />
              <Typography content={detail?.question} fontTypo="body-s-desktop" />
            </div>

            <div>
              <Typography
                content={t('support:supportTime')}
                fontTypo="body-s-desktop"
                weight="semibold"
              />
              <Typography
                content={`${supportTime} ${t('common:minute')}`}
                fontTypo="body-s-desktop"
              />
            </div>
          </div>
        </>
      }
    />
  );
};
