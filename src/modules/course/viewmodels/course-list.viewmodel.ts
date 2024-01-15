// Generate code from clean architecture template

import { useState } from 'react';
import { CourseHttpRepository } from '../adapters/repositories';
import { useBaseViewModel } from '@/core';
import { FindAllCourseUseCase } from '@/domains/course/usecases';
import { CourseEntity } from '@/domains/course/entities';

export default function CourseListViewModel() {
  const findAllCourseUC = new FindAllCourseUseCase(new CourseHttpRepository());
  const { loading, error, catchAction } = useBaseViewModel();

  const [courseList, setCourseList] = useState<CourseEntity[]>([]);

  const actionGetAllCourse: () => void = async () => {
    await catchAction(async () => {
      const data = await findAllCourseUC.run();
      setCourseList(data);
    });
  };

  return {
    loading,
    error,
    courseList,
    actionGetAllCourse,
  };
}
