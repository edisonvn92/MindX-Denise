import React from 'react';
import { SupportListProvider } from '../../context/SupportListProvider';
import { SupportListScreen } from './SupportListScreen';
import { PERMISSIONS } from '@/core/constants/permission.constant';
import { Authorize } from '@/core';

export const SupportListWithoutAuthor: React.FC<unknown> = () => {
  return (
    <SupportListProvider>
      <div className="bg-mx-white h-full py-5 px-10 flex flex-col flex-wrap">
        <SupportListScreen />
      </div>
    </SupportListProvider>
  );
};

export const SupportList = Authorize<unknown>(SupportListWithoutAuthor, PERMISSIONS.SUPPORT.VIEW);
