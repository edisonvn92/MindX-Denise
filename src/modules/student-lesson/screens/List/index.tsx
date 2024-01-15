import React from 'react';
import { StudentLessonListProvider } from '../../context/StudentLessonListProvider';
import { StudentLessonListScreen } from './StudentLessonListScreen';
import { Authorize } from '@/core';
import { PERMISSIONS } from '@/core/constants/permission.constant';

export const StudentLessonListWithoutAuthor: React.FC<unknown> = () => {
  return (
    <StudentLessonListProvider>
      <div className="bg-mx-white h-full py-5 px-10 flex flex-col flex-wrap">
        <StudentLessonListScreen />
      </div>
    </StudentLessonListProvider>
  );
};

export const StudentLessonList = Authorize<unknown>(
  StudentLessonListWithoutAuthor,
  PERMISSIONS.STUDENT_LESSON.VIEW,
);
