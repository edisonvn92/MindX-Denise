import React, { useEffect, useRef } from 'react';
import { ChatInput } from './ChatInput/ChatInput';
import { ChatContentScreen } from './ChatContent/ChatContent';
import { Typography } from '@/mx';
import { useAppContext, useCoreContext } from '@/core';
import './index.scss';

type ChatSiderProps = {
  hideHeader: boolean;
};

export const ChatSider: React.FC<ChatSiderProps> = (props: ChatSiderProps) => {
  const { hideHeader } = props;
  const { t } = useAppContext();
  const { chatContentList } = useCoreContext();
  const scrollEndRef = useRef(null);

  useEffect(() => {
    (scrollEndRef.current as any).scrollIntoView({ behavior: 'smooth', inline: 'center' });
  }, [chatContentList]);

  return (
    <div className="w-full h-full bg-mx-white p-4 relative z-5 rounded-xl">
      <div className="h-full flex flex-col">
        {!hideHeader ? (
          <Typography
            content={t('common:chat')}
            fontTypo="heading-s-desktop"
            weight="bold"
            className="mb-4"
          />
        ) : (
          <div className="mb-4 h-6" />
        )}
        <div className="grow overflow-y-auto">
          <ChatContentScreen />
          <div ref={scrollEndRef} />
        </div>
        <ChatInput />
      </div>
    </div>
  );
};
