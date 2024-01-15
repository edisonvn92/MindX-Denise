import React from 'react';
import { Typography } from '@mx/ui';
import { useAppContext, useCoreContext } from '@/core';
import './index.scss';
import { StudentStatusEnum } from '@/domains/realtime-dashboard/entities';

export const StatusCard = () => {
  const { t } = useAppContext();
  const { overviewDatas, setFilter, filter } = useCoreContext();

  const handleFilterByStatus = (status: StudentStatusEnum) => {
    setFilter({ ...filter, status });
  };

  return (
    <div className="rounded-lg border border-solid border-mx-gray-200 bg-mx-gray-50 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      <div
        className="card m-2 cursor-pointer transform transition-all duration-200"
        onClick={() => handleFilterByStatus(StudentStatusEnum.Studying)}
      >
        <div className="m-3 cards-border">
          <div className="flex items-center justify-start mb-2">
            <div className="status-flag rounded-[4px] bg-mx-green-500 mr-2" />
            <Typography fontTypo="heading-s-desktop" content={t('common:studentStudying')} />
          </div>
          <div className="text-lg font-bold text-gray-700 hover:text-gray-900 transition-all duration-200">
            <Typography
              fontTypo="heading-l-desktop"
              weight="semibold"
              content={overviewDatas.countOnlineStudents}
            />
          </div>
        </div>
      </div>
      <div className="card m-2 cursor-pointer transform transition-all duration-200">
        <div className="m-3 cards-border">
          <div className="flex items-center justify-start mb-2">
            <div className="status-flag rounded-[4px] bg-mx-green-500 mr-2" />
            <Typography fontTypo="heading-s-desktop" content={t('common:mentorIsDuty')} />
          </div>
          <div className="text-lg font-bold text-gray-700 hover:text-gray-900 transition-all duration-200 ">
            <Typography
              fontTypo="heading-l-desktop"
              weight="semibold"
              content={overviewDatas.countOnlineMentors}
            />
          </div>
        </div>
      </div>
      <div
        className="card m-2 cursor-pointer transform transition-all duration-200"
        onClick={() => handleFilterByStatus(StudentStatusEnum.NotBeFoundMentor)}
      >
        <div className="m-3">
          <div className="flex items-center justify-start mb-2">
            <div className="status-flag rounded-[4px] bg-mx-red-500 mr-2" />
            <Typography fontTypo="heading-s-desktop" content={t('common:supportInterupt')} />
          </div>
          <div className="text-lg font-bold text-gray-700 hover:text-gray-900 transition-all duration-200">
            <Typography
              fontTypo="heading-l-desktop"
              weight="semibold"
              content={overviewDatas.countStruggleSupport}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
