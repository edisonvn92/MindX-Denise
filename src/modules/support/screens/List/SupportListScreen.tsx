import React from 'react';
import { SupportListTable } from '../../components';
import { Typography } from '@/mx';
import { useAppContext, useCoreContext } from '@/core';
import { GetIcon } from '@/components';
import CoreDesignTabs from '@/components/Tab/Tabs';

export const SupportListScreen: React.FC = () => {
  const { t } = useAppContext();
  const { supportList } = useCoreContext();

  return (
    <div className="w-full">
      {supportList && (
        <div className="mt-8 p-4 light03 rounded-lg w border border-solid border-mx-gray-200">
          <div className="cursor-pointer flex px-4 py-2 ">
            <GetIcon icon="IoChatbubbleOutline" className="mr-6 h-6 w-6 mt-2" />
            <Typography
              fontTypo="heading-l-desktop"
              weight="semibold"
              content={t('support:requestSupport')}
            />
          </div>

          <CoreDesignTabs
            positionContent="bottom"
            child={[
              {
                tabId: 'waitingConfirmation',
                tabTitle: t('support:waitingConfirmation'),
                tabContent: <SupportListTable supportList={supportList} />,
              },
              {
                tabId: 'completed',
                tabTitle: t('support:completed'),
                tabContent: <div />,
              },
            ]}
            defaultTab="waitingConfirmation"
          />
        </div>
      )}
    </div>
  );
};
