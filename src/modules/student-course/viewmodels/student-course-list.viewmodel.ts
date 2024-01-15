// Generate code from clean architecture template

import { useState } from 'react';
import { StudentCourseHttpRepository } from '../adapters/repositories';
import { useBaseViewModel } from '@/core';
import { StudentCourseEntity } from '@/domains/student-course/entities';
import { FindAllStudentCourseUsecase } from '@/domains/student-course/usecases';

export default function StudentCourseViewModel() {
  const findAllStudentCourseUC = new FindAllStudentCourseUsecase(new StudentCourseHttpRepository());
  const { loading, error, catchAction } = useBaseViewModel();

  const [studentCourseList, setStudentCourseList] = useState<StudentCourseEntity[]>([]);

  const actionGetAllStudentCourse: () => void = async () => {
    await catchAction(async () => {
      const data = await findAllStudentCourseUC.run({});
      setStudentCourseList(data);
    });
  };

  return {
    loading,
    error,
    studentCourseList,
    actionGetAllStudentCourse,
  };
}
