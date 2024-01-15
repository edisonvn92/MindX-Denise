import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@mx/ui';
import { useAppContext } from '@/core';

interface UserInfo {
  fullName: string;
}

type Props = {
  user: UserInfo;
};

export const UserInfo: React.FC<Props> = (props: Props) => {
  const { user } = props;
  const { t } = useAppContext();
  return (
    <div className="p-4">
      <Typography content={user.fullName} fontTypo="body-m-desktop" className="text-mx-gray-900" />
      <Link to="to">
        <Typography
          content={t('common:editInformation')}
          fontTypo="body-s-desktop"
          className="text-mx-gray-600 whitespace-normal"
        />
      </Link>
    </div>
  );
};
