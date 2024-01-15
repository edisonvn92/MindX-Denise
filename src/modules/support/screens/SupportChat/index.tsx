import React from 'react';
import { SupportChatProvider } from '../../context/SupportChatProvider';
import { SupportChatScreen } from './SupportChatScreen';

interface SupportChatPageProps {
  isSupported?: boolean;
  mainScreen?: React.ReactNode;
}

export const SupportChatPage: React.FC<SupportChatPageProps> = (props: SupportChatPageProps) => {
  const { isSupported, mainScreen } = props;
  return (
    <SupportChatProvider>
      <div className="bg-mx-white flex flex-col flex-wrap">
        <div>
          <SupportChatScreen isSupported={isSupported} mainScreen={mainScreen} />
        </div>
      </div>
    </SupportChatProvider>
  );
};
