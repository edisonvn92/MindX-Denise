import React from 'react';
import dayjs from 'dayjs';
import { Typography } from '@mx/ui';
import { useAppContext, useCoreContext } from '@/core';
import './index.scss';
import { ChatMessageData } from '@/helpers/peer';

export const ChatContentScreen: React.FC = () => {
  const { t } = useAppContext();
  const { currentPeerId, chatContentList } = useCoreContext();

  return (
    <>
      {chatContentList.map((content: ChatMessageData, index: number) => {
        const isCurrentUser = currentPeerId === content.peerId;
        return isCurrentUser ? (
          <div className="mb-2" key={index}>
            <div className="flex w-full justify-end text-mx-gray-600 mb-2">
              <Typography
                content={t('common:you')}
                fontTypo="body-xs-desktop"
                weight="semibold"
                className="mr-2"
              />
              <Typography
                content={dayjs(content.createdAt).format('HH:mm')}
                fontTypo="body-xs-desktop"
              />
            </div>
            <div className="flex w-full justify-end">
              <div className="bg-mx-gray-900 text-mx-white w-1/2 p-2 current-user-text-box">
                <Typography content={content.message} fontTypo="body-xs-desktop" />
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-2" key={index}>
            <div className="flex w-full text-mx-gray-600 mb-2">
              <Typography
                content={content.userName}
                fontTypo="body-xs-desktop"
                weight="semibold"
                className="mr-2"
              />
              <Typography
                content={dayjs(content.createdAt).format('HH:mm')}
                fontTypo="body-xs-desktop"
              />
            </div>
            <div className="flex w-full">
              <div className="bg-mx-gray-50 border border-solid border-mx-gray-200 w-1/2 p-2 partner-text-box">
                <Typography content={content.message} fontTypo="body-xs-desktop" />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
