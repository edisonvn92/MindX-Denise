import React from 'react';
import Lottie from 'react-lottie';
import { Typography } from '@mx/ui';
import { useAppContext } from '@/core';
import mentorFoundAnimation from '@/assets/lotties/Going-online.json';

export const MentorFoundScreen: React.FC = () => {
  const { t } = useAppContext();
  return (
    <>
      <div className="flex w-full justify-center mb-10">
        <Typography fontTypo="heading-m-mobile" weight="bold" content={t('support:mentorFound')} />
      </div>
      <div className="flex w-full justify-center mb-10">
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: mentorFoundAnimation,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice',
            },
          }}
          height={256}
          width={320}
        />
      </div>
      <div className="flex w-full justify-center mb-10">
        <Typography fontTypo="body-m-desktop" content={t('support:waitToStartSupportSession')} />
      </div>
    </>
  );
};
