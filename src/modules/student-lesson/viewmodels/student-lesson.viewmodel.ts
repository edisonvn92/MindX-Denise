// Generate code from clean architecture template

import { useState } from 'react';
import { StudentLessonHttpRepository } from '../adapters/repositories';
import { FindAllStudentLessonUseCase } from '@/domains/student-lesson/usecases';
import { CourseMinimum, StudentLessonEntity } from '@/domains/student-lesson/entities';
import { useBaseViewModel } from '@/core';
import { FindStudentLessonPayload } from '@/domains/student-lesson/ports/payloads';

export default function StudentLessonViewModel() {
  const findAllUC = new FindAllStudentLessonUseCase(new StudentLessonHttpRepository());
  const [studentLesson, setStudentLesson] = useState<StudentLessonEntity[]>([]);
  const [courseDetail, setCourseDetail] = useState<CourseMinimum | undefined>(undefined);
  const { loading, error, catchAction } = useBaseViewModel();

  const actionGetAllStudentLesson: (payload: FindStudentLessonPayload) => void = async (
    payload,
  ) => {
    await catchAction(async () => {
      const data = await findAllUC.run(payload);
      setStudentLesson(data.lessons);
      setCourseDetail(data.course);
    });
  };

  return {
    loading,
    error,
    courseDetail,
    studentLesson,
    actionGetAllStudentLesson,
  };
}
