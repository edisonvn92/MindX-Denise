import React from 'react';
import { StudentCourseListProvider } from '../../context/StudentCourseListProvider';
import { StudentCourseListScreen } from './StudentCourseList';
import { Authorize } from '@/core';
import { PERMISSIONS } from '@/core/constants/permission.constant';

export const StudentCourseListWithoutAuthor: React.FC<unknown> = () => {
  return (
    <StudentCourseListProvider>
      <div className="bg-mx-white h-full px-10 py-5 flex flex-col flex-wrap">
        <StudentCourseListScreen />
      </div>
    </StudentCourseListProvider>
  );
};

export const StudentCourseList = Authorize<unknown>(
  StudentCourseListWithoutAuthor,
  PERMISSIONS.STUDENT_COURSE.VIEW,
);
