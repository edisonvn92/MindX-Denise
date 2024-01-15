import { useState } from 'react';
import { LessonHttpRepository } from '../adapters/repositories';
import { useBaseViewModel } from '@/core';
import { FindOneLessonUseCase } from '@/domains/lesson/usecases';
import { LessonEntity } from '@/domains/lesson/entities';
import { GetDetailCourseUseCase } from '@/domains/course/usecases';
import { CourseHttpRepository } from '@/modules/course/adapters/repositories';
import { CourseEntity } from '@/domains/course/entities';

export default function CourseDetailViewModel() {
  const getDetailLessonUC = new FindOneLessonUseCase(new LessonHttpRepository());
  const getDetailCourseUC = new GetDetailCourseUseCase(new CourseHttpRepository());
  const { loading, error, catchAction } = useBaseViewModel();
  const [lessonDetail, setLessonDetail] = useState<LessonEntity | undefined>(undefined);
  const [courseDetail, setCourseDetail] = useState<CourseEntity | undefined>(undefined);

  const actionGetCourseDetail: (id: string) => void = async (id: string) => {
    await catchAction(async () => {
      const data = await getDetailCourseUC.run(id);
      setCourseDetail(data);
    });
  };

  const actionGetLessonDetail: (id: string) => void = async (id: string) => {
    await catchAction(async () => {
      const data = await getDetailLessonUC.run(id);
      setLessonDetail(data);
      await actionGetCourseDetail(data.courseId);
    });
  };

  return {
    loading,
    error,
    lessonDetail,
    actionGetLessonDetail,
    courseDetail,
    actionGetCourseDetail,
  };
}
