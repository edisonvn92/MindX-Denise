import React, { useCallback, useEffect } from 'react';
import { Typography } from '@mx/ui';
import StudentStatusBox from './StudentStatusBox';
import { useAppContext, useCoreContext } from '@/core';
import { StudentAction } from '@/domains/realtime-dashboard/entities';
import { SupportItemDetailDialog } from '@/modules/support/components/SupportList/SupportItemDetailDialog/SupportItemDetailDialog';

interface StudentStatusListProps {
  studentAction: StudentAction;
  tabIndex: number;
  isError?: boolean;
}

const StudentStatusList = (props: StudentStatusListProps) => {
  const { t } = useAppContext();
  const { studentAction, tabIndex, isError } = props;
  const { setIsDetailDialogOpened } = useCoreContext();

  const handleShowStatusOfStudent = useCallback((status: string) => {
    return t(`common:${status}`);
  }, []);

  const onClickSeeDetail = () => {
    setIsDetailDialogOpened(true);
  };

  return (
    <div className="w-full flex" tabIndex={tabIndex}>
      <StudentStatusBox width="w-[7%]" content={studentAction?.time ?? '--'} />
      <StudentStatusBox
        width="w-[21%]"
        content={handleShowStatusOfStudent(studentAction.status)}
        status={studentAction.status}
        isError={isError}
      />
      <StudentStatusBox width="w-[20%]" content={studentAction.reason} />

      <div className="p-2 mr-4 w-[11%]">
        <div
          className="cursor-pointer"
          role="button"
          tabIndex={0}
          onClick={onClickSeeDetail}
          onKeyDown={onClickSeeDetail}
        >
          <Typography
            content={t('support:viewQuestion')}
            className="cursor-pointer text-mx-blue-600 hover:text-mx-blue-900"
            fontTypo="body-s-desktop"
          />
        </div>
      </div>
      <StudentStatusBox width="w-[9%]" content={studentAction?.mentor ?? '--'} />
      <StudentStatusBox width="w-[14%]" content={studentAction.courseName} />
      <StudentStatusBox width="w-[23%] truncate" content={studentAction.lessonName} />
      <SupportItemDetailDialog detail={studentAction} />
    </div>
  );
};

export default StudentStatusList;
