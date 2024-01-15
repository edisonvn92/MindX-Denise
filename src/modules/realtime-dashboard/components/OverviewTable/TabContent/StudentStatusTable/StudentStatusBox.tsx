import { Typography } from '@mx/ui';
import React, { useEffect, useState } from 'react';
import { GetIcon } from '@/components';
import { StudentStatusEnum } from '@/domains/realtime-dashboard/entities';

interface StudentStatusBoxProps {
  width: string;
  status?: string;
  content: string;
  isError?: boolean;
}

const StudentStatusBox = (props: StudentStatusBoxProps) => {
  const { width, content, status, isError } = props;
  const [className, setClassName] = useState<string>('');

  useEffect(() => {
    if (status) {
      switch (status) {
        case StudentStatusEnum.BeSupporting:
        case StudentStatusEnum.Studying:
          setClassName('text-mx-green-600');
          break;
        case StudentStatusEnum.NotBeFoundMentor:
          setClassName('text-mx-red-600');
          break;
        case StudentStatusEnum.Offline:
          setClassName('text-mx-gray-600');
          break;
        default:
          setClassName('text-mx-yellow-600');
          break;
      }
    }
  }, [status]);

  return (
    <div className={`p-2 mr-4 flex justify-between ${width} ${className}`}>
      <Typography content={content ?? '--'} fontTypo="body-s-desktop" />
      {(status === StudentStatusEnum.NotBeFoundMentor || isError) && (
        <GetIcon icon="IoAlertCircleOutline" className="w-5 h-5 items-center my-auto" />
      )}
    </div>
  );
};

export default StudentStatusBox;
