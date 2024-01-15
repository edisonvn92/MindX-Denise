import React, { useState } from 'react';
import { Typography } from '@mx/ui';
import Collapsible from 'react-collapsible';
import StudentStatusList from './StudentStatusList';
import { StudentAction, StudentStatusEntity } from '@/domains/realtime-dashboard/entities';
import { GetIcon } from '@/components';

interface StudentStatusItemProps {
  data: StudentStatusEntity;
}

const List = React.memo(StudentStatusList);

const StudentStatusItem = (props: StudentStatusItemProps) => {
  const { data } = props;
  const [open, setOpen] = useState<boolean>(false);
  const [isClose, setIsClose] = useState<boolean>(() => !open);

  const handleTriggerClick = () => {
    setOpen(!open);
    setIsClose(false);
  };

  const rendeTtriggerSibling = ():
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | undefined => {
    if (data?.actions && isClose) {
      return <List studentAction={data?.actions[0]} tabIndex={-1} isError={!!data?.isError} />;
    }
    return <div />;
  };

  const renderStudentStatusList = () => {
    if (data?.actions) {
      return data?.actions.map((studentAction: StudentAction, index: number) => (
        <List key={index} studentAction={studentAction} tabIndex={index} />
      ));
    }

    return undefined;
  };

  return (
    <div className="border border-solid border-mx-gray-200 rounded-lg mt-4">
      <Collapsible
        className="w-full"
        open={open}
        overflowWhenOpen="visible"
        allowTransparency
        onClose={() => {
          setIsClose(true);
        }}
        handleTriggerClick={handleTriggerClick}
        triggerSibling={rendeTtriggerSibling()}
        trigger={
          <div className="w-full p-2 flex bg-mx-gray-50 rounded-t-lg justify-between cursor-pointer">
            <div className="flex">
              {data.studentAvatar ? (
                <img
                  src={data.studentAvatar}
                  alt="student avatar"
                  className="object-cover rounded-full w-8 h-8 mr-2"
                />
              ) : (
                <div className="rounded-full w-8 h-8 mr-2 avatar-filler" />
              )}
              <Typography
                fontTypo="body-m-desktop"
                content={data.studentName}
                className="my-auto items-center"
              />
            </div>
            <div className="flex">
              <GetIcon
                icon={open ? 'IoChevronDownOutline' : 'IoChevronUpOutline'}
                className="w-4 h-4 items-center my-auto"
              />
            </div>
          </div>
        }
      >
        <div className="w-full flex flex-col py-2">{renderStudentStatusList()}</div>
      </Collapsible>
    </div>
  );
};

export default StudentStatusItem;
