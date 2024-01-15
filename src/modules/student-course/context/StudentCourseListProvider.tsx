import React, { useEffect } from 'react';
import useViewModel from '../viewmodels/student-course-list.viewmodel';
import { PageProvider } from '@/core/context/PageContext';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const StudentCourseListProvider = (props: any) => {
  const { children } = props;
  const { studentCourseList, actionGetAllStudentCourse, loading, error } = useViewModel();

  useEffect(() => {
    actionGetAllStudentCourse();
  }, []);

  const data = {
    studentCourseList,
    actionGetAllStudentCourse,
    loading,
    error,
  };

  return <PageProvider {...data}>{children}</PageProvider>;
};
