import React from 'react';
import { Button, Typography } from '@mx/ui';
import { useAppContext, useCoreContext } from '@/core';

export const StudentEndSupportScreen: React.FC = () => {
  const { t } = useAppContext();
  const { actionRateSession } = useCoreContext();
  return (
    <div className="rounded-xl border border-solid border-mx-gray-200 bg-mx-white light03 p-8 mx-auto w-[570px]">
      <div className="flex w-full justify-center mb-10">
        <Typography
          className="text-center"
          fontTypo="heading-m-mobile"
          weight="bold"
          content={t('support:areYouSatisfiedWithTheSupport')}
        />
      </div>
      <div className="flex w-full justify-center mb-10">
        <Typography
          fontTypo="body-m-desktop"
          content={t('support:pleaseHelpMentorFinishSession')}
        />
      </div>
      <div className="w-full grid grid-cols-2 gap-2">
        <Button
          type="filled-secondary"
          size="medium"
          content={
            <Typography
              content={t('support:unsatisfied')}
              fontTypo="body-l-desktop"
              weight="semibold"
            />
          }
          onClick={() => actionRateSession(false)}
        />
        <Button
          type="filled-primary"
          size="medium"
          content={
            <Typography
              content={t('support:satisfied')}
              fontTypo="body-l-desktop"
              weight="semibold"
            />
          }
          onClick={() => actionRateSession(true)}
        />
      </div>
    </div>
  );
};
