import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useViewModel from '../viewmodels/student-lesson.viewmodel';
import { PageProvider } from '@/core/context/PageContext';
import { useAppContext } from '@/core';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const StudentLessonListProvider = (props: any) => {
  const params = useParams();
  const { id } = params;
  const { currentUser } = useAppContext();

  const { children } = props;
  const { courseDetail, studentLesson, actionGetAllStudentLesson, loading, error } = useViewModel();

  useEffect(() => {
    if (currentUser && id) actionGetAllStudentLesson({ studentId: currentUser.id, courseId: id });
  }, []);

  const data = {
    courseDetail,
    studentLesson,
    actionGetAllStudentLesson,
    loading,
    error,
  };

  return <PageProvider {...data}>{children}</PageProvider>;
};
