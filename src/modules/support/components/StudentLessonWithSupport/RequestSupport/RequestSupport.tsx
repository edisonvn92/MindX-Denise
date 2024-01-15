import React from 'react';
import { Typography } from '@mx/ui';
import { SupportStatusEnum } from '../../../helper/SupportStatusEnum';
import { RequestSupportForm } from './RequestSupportForm/RequestSupportForm';
import { RequestSupportWaitingScreen } from './RequestSupportWaitingScreen/RequestSupportWaitingScreen';
import { RequestSupportExpiredScreen } from './RequestSupportExpired/RequestSupportExpiredScreen';
import { MentorFoundScreen } from './MentorFoundScreen/MentorFoundScreen';
import { useAppContext, useCoreContext } from '@/core';
import { useResponsive } from '@/core/hooks/useResponsive';
import { ContentSizeEnum } from '@/core/context/AppContext';

export const RequestSupport: React.FC = () => {
  const { fontHeadingMatches } = useResponsive();
  const { supportStatus } = useCoreContext();
  const { t } = useAppContext();

  // Get peerId and push to form

  return (
    <div className="w-full h-full relative">
      <div className="absolute top-0 pl-4  border-left">
        <Typography
          fontTypo={fontHeadingMatches(ContentSizeEnum.ExtraLarge)}
          weight="semibold"
          content={t('support:requestSupport')}
        />
      </div>
      <div className="w-full h-full flex justify-between items-center">
        <div className="rounded-xl border border-solid border-mx-gray-200 bg-mx-white light03 p-8 mx-auto w-[570px]">
          {supportStatus === SupportStatusEnum.Requesting ? <RequestSupportForm /> : undefined}
          {supportStatus === SupportStatusEnum.Waiting ? (
            <RequestSupportWaitingScreen />
          ) : undefined}
          {supportStatus === SupportStatusEnum.Expired ? (
            <RequestSupportExpiredScreen />
          ) : undefined}
          {supportStatus === SupportStatusEnum.MentorFound ? <MentorFoundScreen /> : undefined}
        </div>
      </div>
    </div>
  );
};
