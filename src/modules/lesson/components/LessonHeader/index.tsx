import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mx/ui';
import { useCoreContext } from '@/core';
import './index.scss';
import { GetIcon } from '@/components';

export const LessonHeader: React.FC = () => {
  const { courseDetail, lessonDetail } = useCoreContext();
  const navigate = useNavigate();

  const onClickBack = () => {
    navigate(`/courses/${courseDetail.id}`);
  };
  return (
    <div className="w-full bg-mx-white p-0 m-0 relative top-0 z-5 h-16 light03 -mb-16 leading-5 lesson-header">
      <div className="w-full h-full px-6 flex text-center items-center">
        <Button
          type="filled-secondary"
          size="small"
          iconOnly
          leftIcon={<GetIcon icon="IoChevronBackOutline" className="h-4 w-4" />}
          onClick={onClickBack}
          className="px-[8px] py-[8px] mr-1"
        />
        <Typography content={`${courseDetail?.name}`} fontTypo="body-m-desktop" />
        <span> &nbsp; / &nbsp;</span>
        <Typography
          fontTypo="body-m-desktop"
          weight="bold"
          content={lessonDetail?.name || 'Untitled'}
        />
      </div>
    </div>
  );
};
