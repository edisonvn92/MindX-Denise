import React from 'react';
import { Button, Typography } from '@mx/ui';
import dayjs from 'dayjs';
import { SupportItemDetailDialog } from '../SupportItemDetailDialog/SupportItemDetailDialog';
import { useAppContext, useSocketContext } from '@/core';
import { SupportEntity, SupportType } from '@/domains/support/entities';
import Tag from '@/components/Tag';

interface SupportListItemProps {
  supportItem: SupportEntity;
  onClickDetail(supportItem: SupportEntity): void;
  onCLickReject(): void;
  onClickAccept(): void;
  onClickRecall(): void;
}

export const SupportListItem: React.FC<SupportListItemProps> = (props: SupportListItemProps) => {
  const { supportItem, onClickDetail, onCLickReject, onClickAccept, onClickRecall } = props;
  const { t } = useAppContext();
  const { isOnRecall } = useSocketContext();

  const renderActionButton = (type?: string) => {
    if (type === SupportType.MISSED) {
      return (
        <>
          <Button
            type="outlined-danger"
            size="small"
            className="mr-2"
            content={
              <Typography
                content={isOnRecall ? t('common:cancel') : t('common:refuse')}
                fontTypo="body-l-desktop"
                weight="semibold"
              />
            }
            onClick={onCLickReject}
          />
          <Button
            type="filled-primary"
            size="small"
            content={
              <Typography
                content={isOnRecall ? t('common:isOnRecall') : t('common:recall')}
                fontTypo="body-l-desktop"
                className="px-3"
                weight="semibold"
              />
            }
            onClick={onClickRecall}
            disabled={isOnRecall}
          />
        </>
      );
    }

    return (
      <>
        <Button
          type="outlined-danger"
          size="small"
          className="mr-2"
          content={
            <Typography content={t('common:refuse')} fontTypo="body-l-desktop" weight="semibold" />
          }
          onClick={onCLickReject}
          disabled={isOnRecall}
        />
        <Button
          type="filled-primary"
          size="small"
          content={
            <Typography
              content={t('common:accept')}
              fontTypo="body-l-desktop"
              className="px-3"
              weight="semibold"
            />
          }
          onClick={() => onClickAccept()}
          disabled={isOnRecall}
        />
      </>
    );
  };

  return (
    <div key={supportItem.id} className="border border-solid border-mx-gray-200 rounded-lg mt-4">
      <div className="w-full p-2 flex bg-mx-gray-50 rounded-t-lg">
        {supportItem.studentAvatar ? (
          <img
            src={supportItem.studentAvatar}
            alt="student avatar"
            className="object-cover rounded-full w-8 h-8 mr-2"
          />
        ) : (
          <div className="rounded-full w-8 h-8 mr-2 avatar-filler" />
        )}
        <Typography
          fontTypo="body-m-desktop"
          content={supportItem.studentName}
          className="mt-0.5"
        />
      </div>
      <div className="w-full flex py-2 items-center">
        <div className="p-2 w-[10.8%]">
          <Typography
            content={dayjs(Number(supportItem.createdAt)).format('HH:mm:ss')}
            fontTypo="body-s-desktop"
          />
        </div>
        <div className="p-2 course-col">
          <Typography content={supportItem.courseName} fontTypo="body-s-desktop" />
        </div>
        <div className="p-2 lesson-col truncate">
          <Typography content={supportItem.lessonName} fontTypo="body-s-desktop" />
        </div>

        <div className="p-2 detail-col">
          <div className="cursor-pointer" onClick={() => onClickDetail(supportItem)}>
            <Typography
              content={t('support:viewQuestion')}
              className="cursor-pointer text-mx-blue-600 hover:text-mx-blue-900"
              fontTypo="body-s-desktop"
            />
          </div>
        </div>

        <div className="p-2 w-[11%]">
          {supportItem?.type === SupportType.MISSED ? (
            <Tag content={t('support:missed')} type="warning" />
          ) : (
            <Tag content={t('support:live')} type="success" />
          )}
        </div>
        <div className="p-2 grow flex">{renderActionButton(supportItem?.type)}</div>
      </div>
      <SupportItemDetailDialog detail={supportItem} onClickAccept={onClickAccept} />
    </div>
  );
};
