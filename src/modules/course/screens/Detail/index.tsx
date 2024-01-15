import React from 'react';
import { CourseDetailProvider } from '../../context/CourseDetailProvider';
import { CourseDetailScreen } from '../Detail/CourseDetailScreen';
import { Authorize } from '@/core';
import { PERMISSIONS } from '@/core/constants/permission.constant';

export const CourseDetailWithoutAuthor: React.FC<unknown> = () => {
  return (
    <CourseDetailProvider>
      <div className="bg-mx-white h-full py-5 px-10 flex flex-col flex-wrap">
        <CourseDetailScreen />
      </div>
    </CourseDetailProvider>
  );
};

export const CourseDetail = Authorize<unknown>(CourseDetailWithoutAuthor, PERMISSIONS.COURSE.VIEW);
