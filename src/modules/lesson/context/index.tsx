import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import useViewModel from '../viewmodels/lesson-detail.viewmodel';
import { PageProvider } from '@/core/context/PageContext';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const LessonProvider = (props: any) => {
  const params = useParams();
  const { children } = props;
  const [currentQueryParameters] = useSearchParams();
  const courseId = currentQueryParameters.get('courseId');
  const {
    lessonDetail,
    actionGetLessonDetail,
    courseDetail,
    actionGetCourseDetail,
    loading,
    error,
  } = useViewModel();

  const [isEditCourseDialogOpened, setIsEditCourseDialogOpened] = useState<boolean>(false);
  useEffect(() => {
    if (params.id) actionGetLessonDetail(params.id);
    else if (courseId) actionGetCourseDetail(courseId);
  }, []);

  const data = {
    lessonDetail,
    actionGetLessonDetail,
    courseDetail,
    isEditCourseDialogOpened,
    setIsEditCourseDialogOpened,
    loading,
    error,
  };

  return <PageProvider {...data}>{children}</PageProvider>;
};
