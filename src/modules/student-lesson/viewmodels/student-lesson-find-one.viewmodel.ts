// Generate code from clean architecture template

import { useState } from 'react';
import { StudentLessonHttpRepository } from '../adapters/repositories';
import { StudentLessonEntity } from '@/domains/student-lesson/entities';
import { useBaseViewModel } from '@/core';
import {
  FindOneStudentLessonUseCase,
  GetScratchStateUseCase,
  TakeQuizUseCase,
  UpdateLearningProgressUseCase,
  UpdateScratchStateUseCase,
} from '@/domains/student-lesson/usecases';
import {
  TakeQuizPayload,
  UpdateLearningProgressPayload,
  UpdateScratchStatePayload,
} from '@/domains/student-lesson/ports/payloads';

export default function StudentLessonFindOneViewModel() {
  const repo = new StudentLessonHttpRepository();
  const findOneDUC = new FindOneStudentLessonUseCase(repo);
  const getCurrentScratchStateUC = new GetScratchStateUseCase(repo);
  const updateLearningProgressUC = new UpdateLearningProgressUseCase(repo);
  const updateTakeQuizUC = new TakeQuizUseCase(repo);
  const updateScratchStateUC = new UpdateScratchStateUseCase(repo);
  const [studentLesson, setStudentLesson] = useState<StudentLessonEntity | undefined>(undefined);
  const [scratchState, setScratchState] = useState<string>('');
  const { loading, error, catchAction } = useBaseViewModel();

  const actionGetStudentLessonById: (id: string) => void = async (id) => {
    await catchAction(async () => {
      const data = await findOneDUC.run(id);
      setStudentLesson(data);
      sessionStorage.setItem('studentLesson', JSON.stringify(data));
    });
  };

  const actionUpdateLearningProgress = async (payload: UpdateLearningProgressPayload) => {
    await catchAction(async () => {
      await updateLearningProgressUC.run(payload);
    });
  };

  const actionTakeQuiz = async (payload: TakeQuizPayload) => {
    await catchAction(async () => {
      await updateTakeQuizUC.run(payload);
    });
  };

  const actionGetCurrentScratchState = async (id: string) => {
    await catchAction(async () => {
      const data = await getCurrentScratchStateUC.run(id);
      setScratchState(data.scratchState);
    });
  };

  const actionUpdateScratchState = async (payload: UpdateScratchStatePayload) => {
    await catchAction(async () => {
      await updateScratchStateUC.run(payload);
    });
  };

  return {
    loading,
    error,
    studentLesson,
    scratchState,
    actionGetStudentLessonById,
    actionGetCurrentScratchState,
    actionUpdateLearningProgress,
    actionTakeQuiz,
    actionUpdateScratchState,
  };
}
