import React, { useState } from 'react';
import { Typography } from '@mx/ui';
import StudentStatusItem from './StudentStatusItem';
import { useAppContext, useCoreContext } from '@/core';
import { StudentStatusEntity } from '@/domains/realtime-dashboard/entities';

interface TabContentProps {
  type: string;
}

const TableContent = (props: TabContentProps) => {
  const { type } = props;
  const { t } = useAppContext();

  const { studentStatusData, loading } = useCoreContext();

  return (
    <div className="overflow-x-auto w-full">
      <div className="rounded-lg bg-mx-gray-100 w-full flex mt-4 table-auto ">
        <div className="p-2 mr-4 w-[7%]">
          <Typography content={t('common:time')} fontTypo="body-s-desktop" weight="semibold" />
        </div>
        <div className="p-2 mr-4 w-[21%]">
          <Typography content={t('common:status')} fontTypo="body-s-desktop" weight="semibold" />
        </div>

        <div className="p-2 mr-4 w-[20%]">
          <Typography content={t('common:reason')} fontTypo="body-s-desktop" weight="semibold" />
        </div>

        <div className="p-2 mr-4 w-[11%]">
          <Typography content={t('common:detail')} fontTypo="body-s-desktop" weight="semibold" />
        </div>

        <div className="p-2 mr-4 w-[9%]">
          <Typography content={t('common:mentor')} fontTypo="body-s-desktop" weight="semibold" />
        </div>

        <div className="p-2 mr-4 w-[14%]">
          <Typography content={t('common:course')} fontTypo="body-s-desktop" weight="semibold" />
        </div>
        <div className="p-2 grow mr-4 w-[23%]">
          <Typography content={t('common:lesson')} fontTypo="body-s-desktop" weight="semibold" />
        </div>
      </div>
      {studentStatusData?.length > 0 &&
        studentStatusData.map((data: StudentStatusEntity, index: number) => (
          <StudentStatusItem data={data} key={index} />
        ))}
    </div>
  );
};

export default TableContent;
