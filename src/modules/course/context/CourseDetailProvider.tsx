import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useViewModel from '../viewmodels/course-detail.viewmodel';
import { PageProvider } from '@/core/context/PageContext';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CourseDetailProvider = (props: any) => {
  const params = useParams();
  const courseId = params.id;
  const { children } = props;
  const {
    courseDetail,
    actionGetCourseDetail,
    actionToggleCourse,
    actionToggleLesson,
    actionDeleteLesson,
    methodForm,
    loading,
    error,
  } = useViewModel();
  const [isEditCourseDialogOpened, setIsEditCourseDialogOpened] = useState<boolean>(false);
  const [isDeleteLessonDialogOpened, setIsDeleteLessonDialogOpened] = useState<boolean>(false);
  const [selectedLessonId, setSelectedLessonId] = useState<string>('');

  useEffect(() => {
    if (courseId) actionGetCourseDetail(courseId);
  }, []);

  const data = {
    courseId,
    courseDetail,
    actionGetCourseDetail,
    isEditCourseDialogOpened,
    setIsEditCourseDialogOpened,
    isDeleteLessonDialogOpened,
    setIsDeleteLessonDialogOpened,
    selectedLessonId,
    setSelectedLessonId,
    actionToggleCourse,
    actionToggleLesson,
    actionDeleteLesson,
    methodForm,
    loading,
    error,
  };

  return <PageProvider {...data}>{children}</PageProvider>;
};
