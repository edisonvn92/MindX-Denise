import { Tabs, Typography } from '@mx/ui';
import React, { ReactNode } from 'react';
import TabContent from './TabContent';
import CoreDesignTabs from '@/components/Tab/Tabs';
import { useAppContext } from '@/core';

interface ChildrenTabs {
  tabId: string;
  tabTitle: string | ReactNode;
  tabContent: ReactNode;
}

const OverviewTable = () => {
  const { t } = useAppContext();

  const childrenTabs: ChildrenTabs[] = [
    {
      tabId: 'mentor',
      tabTitle: (
        <Typography fontTypo="body-m-desktop" weight="semibold" content={t('common:student')} />
      ),
      tabContent: <TabContent type="mentor" />,
    },
    {
      tabId: 'student',
      tabTitle: (
        <Typography fontTypo="body-m-desktop" weight="semibold" content={t('common:mentor')} />
      ),
      tabContent: <TabContent type="student" />,
    },
  ];

  return (
    <div className="rounded-lg rounded-lg border border-solid border-mx-gray-200 bg-mx-white p-4">
      <CoreDesignTabs positionContent="bottom" child={childrenTabs} defaultTab="mentor" />
    </div>
  );
};

export default OverviewTable;
