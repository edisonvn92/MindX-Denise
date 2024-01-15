import React, { useEffect, useState } from 'react';
import useViewModel from '../viewmodels/course-list.viewmodel';
import { PageProvider } from '@/core/context/PageContext';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CourseListProvider = (props: any) => {
  const { children } = props;
  const { courseList, actionGetAllCourse, loading, error } = useViewModel();
  const [isEditCourseDialogOpened, setIsEditCourseDialogOpened] = useState<boolean>(false);

  useEffect(() => {
    actionGetAllCourse();
  }, []);

  const data = {
    courseList,
    actionGetAllCourse,
    isEditCourseDialogOpened,
    setIsEditCourseDialogOpened,
    loading,
    error,
  };

  return <PageProvider {...data}>{children}</PageProvider>;
};
