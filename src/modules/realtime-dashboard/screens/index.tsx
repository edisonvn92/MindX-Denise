import React from 'react';
import { RealtimeDashboardProvider } from '../context/RealtimeDashboardProvider';
import DashboardScreen from './DashboardScreen';
import { Authorize } from '@/core';
import { PERMISSIONS } from '@/core/constants/permission.constant';

export const RealtimeDashboardPage = () => {
  return (
    <RealtimeDashboardProvider>
      <div className="bg-mx-white h-full w-full px-10 py-10 flex flex-col flex-wrap">
        <div className="flex w-full">
          <DashboardScreen />
        </div>
      </div>
    </RealtimeDashboardProvider>
  );
};

export const RealtimeDashboard = Authorize<unknown>(RealtimeDashboardPage, PERMISSIONS.MENTOR.VIEW);
