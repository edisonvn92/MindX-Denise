import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToast } from '@mx/ui';
import { CourseHttpRepository } from '../adapters/repositories';
import { useAppContext, useBaseViewModel } from '@/core';
import { CourseEntity, CourseLesson } from '@/domains/course/entities';
import { GetDetailCourseUseCase, ToggleCourseUseCase } from '@/domains/course/usecases';
import { ToggleCoursePayload } from '@/domains/course/ports/payloads';
import { ToggleLessonPayload } from '@/domains/lesson/ports/payloads';
import { LessonHttpRepository } from '@/modules/lesson/adapters/repositories';
import { DeleteLessonUseCase, ToggleLessonUseCase } from '@/domains/lesson/usecases';

export default function CourseDetailViewModel() {
  const getDetailCourseUC = new GetDetailCourseUseCase(new CourseHttpRepository());
  const toggleCourseUC = new ToggleCourseUseCase(new CourseHttpRepository());
  const toggleLessonUC = new ToggleLessonUseCase(new LessonHttpRepository());
  const deleteLessonUC = new DeleteLessonUseCase(new LessonHttpRepository());
  const { loading, error, catchAction } = useBaseViewModel();
  const [courseDetail, setCourseDetail] = useState<CourseEntity | undefined>(undefined);
  const { t } = useAppContext();
  const toast = useToast();

  const methodForm = useForm({
    mode: 'onTouched',
    defaultValues: {
      id: '',
      isActive: false,
      lessons: [] as CourseLesson[],
    },
  });
  const { setValue } = methodForm;

  const actionGetCourseDetail: (id: string) => void = async (id: string) => {
    await catchAction(async () => {
      const data = await getDetailCourseUC.run(id);
      setCourseDetail(data);
      setValue('id', id);
      setValue('isActive', data.isActive || false);
      setValue('lessons', data.lessons || []);
    });
  };

  const actionToggleCourse = async (data: ToggleCoursePayload) => {
    try {
      await catchAction(async () => {
        await toggleCourseUC.run(data);
      });
    } catch (e) {
      console.log(e);
    }
  };

  const actionToggleLesson = async (data: ToggleLessonPayload) => {
    try {
      await catchAction(async () => {
        await toggleLessonUC.run(data);
      });
    } catch (e) {
      console.log(e);
    }
  };

  const actionDeleteLesson = async (id: string) => {
    try {
      await catchAction(async () => {
        await deleteLessonUC.run(id);
        toast.addToast({ status: 'success', header: t('course:deleteLessonSuccessfully') });
      });
    } catch (e) {
      console.log(e);
    }
  };

  return {
    loading,
    error,
    courseDetail,
    actionGetCourseDetail,
    actionToggleCourse,
    actionToggleLesson,
    actionDeleteLesson,
    methodForm,
  };
}
