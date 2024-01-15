import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mx/ui';
import { useAppContext } from '@/core';
import { GetIcon } from '@/components';

export const MentorEndSupportScreen: React.FC = () => {
  const { t } = useAppContext();
  const navigate = useNavigate();
  const onClickBack = () => {
    navigate('/support');
  };
  return (
    <div className="rounded-xl border border-solid border-mx-gray-200 bg-mx-white light03 p-8 mx-auto w-[570px]">
      <div className="flex w-full justify-center mb-10">
        <Typography
          fontTypo="heading-m-mobile"
          weight="bold"
          content={t('support:confirmSuccessfully')}
        />
      </div>
      <div className="flex w-full justify-center mb-10">
        <GetIcon icon="IoCheckmarkCircle" className="w-28 h-28 text-mx-green-600" />
      </div>
      <div className="flex w-full justify-center mb-10">
        <Typography
          fontTypo="body-m-desktop"
          content={t('support:studentConfirmSupportSuccessfully')}
        />
      </div>
      <div className="flex w-full justify-center">
        <Button
          type="filled-primary"
          className="grow"
          size="medium"
          content={
            <Typography
              content={t('common:backToMain')}
              fontTypo="body-l-desktop"
              weight="semibold"
            />
          }
          onClick={onClickBack}
        />
      </div>
    </div>
  );
};
