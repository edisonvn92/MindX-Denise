import React from 'react';
import { Typography } from '@mx/ui';
import OverviewTable from '../components/OverviewTable';
import { StatusCard } from '../components/StatusCards';
import { useAppContext, useCoreContext } from '@/core';
import { Loading } from '@/components';

const DashboardScreen = () => {
  const { t } = useAppContext();
  const { isLoadingData } = useCoreContext();

  return (
    <div className=" w-full">
      <div className="mb-10">
        <Typography fontTypo="heading-l-desktop" weight="semibold" content={t('common:realtime')} />
      </div>
      {isLoadingData ? (
        <div className="text-center">
          <Loading sizeProps="large" />
        </div>
      ) : (
        <>
          <div className="rounded-lg mt-4 mx-auto light03 border-mx-gray-200">
            <StatusCard />
          </div>
          <div className="rounded-lg mt-4 mx-auto light03 border-mx-gray-200">
            <OverviewTable />
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardScreen;
