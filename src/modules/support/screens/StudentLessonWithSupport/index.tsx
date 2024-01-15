import React from 'react';
import { StudentLessonWithSupportProvider } from '../../context/StudentLessonWithSupportProvider';
import { StudentLessonWithSupport } from './StudentLessonWithSupport';
import { Authorize } from '@/core';
import { PERMISSIONS } from '@/core/constants/permission.constant';

export const StudentLessonWithSupportScreenWithoutAuthor: React.FC<unknown> = () => {
  return (
    <StudentLessonWithSupportProvider>
      <StudentLessonWithSupport />
    </StudentLessonWithSupportProvider>
  );
};

export const StudentLessonWithSupportScreen = Authorize<unknown>(
  StudentLessonWithSupportScreenWithoutAuthor,
  PERMISSIONS.STUDENT_LESSON.VIEW,
);
