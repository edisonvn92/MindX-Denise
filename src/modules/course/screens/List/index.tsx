import React from 'react';
import { CourseListProvider } from '../../context/CourseListProvider';
import { CourseListScreen } from './CourseListScreen';
import { Authorize } from '@/core';
import { PERMISSIONS } from '@/core/constants/permission.constant';

export const CourseListWithoutAuthor: React.FC<unknown> = () => {
  return (
    <CourseListProvider>
      <div className="bg-mx-white h-full px-10 py-5 flex flex-col flex-wrap">
        <CourseListScreen />
      </div>
    </CourseListProvider>
  );
};

export const CourseList = Authorize<unknown>(CourseListWithoutAuthor, PERMISSIONS.COURSE.VIEW);
