import React from 'react';
import { Typography } from '@mx/ui';
import { StudentEndSupportScreen } from './StudentEndSupport';
import { MentorEndSupportScreen } from './MentorEndSupport';
import { useResponsive } from '@/core/hooks/useResponsive';
import { ContentSizeEnum } from '@/core/context/AppContext';
import { useAppContext } from '@/core';

interface EndSupportProps {
  isStudent: boolean;
}

export const EndSupportScreen: React.FC<EndSupportProps> = (props: EndSupportProps) => {
  const { isStudent } = props;
  const { fontHeadingMatches } = useResponsive();
  const { t } = useAppContext();
  return (
    <div className="bg-mx-white h-full w-full relative ">
      <div className="pl-4 border-left w-full absolute top-10 left-20">
        <Typography
          fontTypo={fontHeadingMatches(ContentSizeEnum.ExtraLarge)}
          weight="semibold"
          content={t('support:endSupport')}
        />
      </div>
      <div className="flex h-full items-center">
        {isStudent ? <StudentEndSupportScreen /> : <MentorEndSupportScreen />}
      </div>
    </div>
  );
};
