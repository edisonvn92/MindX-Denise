// Generate code from clean architecture template

import {
  GET_SCRATCH_STATE,
  GET_STUDENT_LESSON,
  GET_STUDENT_LESSON_LIST,
  UPDATE_LEARNING_PROGRESS,
  UPDATE_SCRATCH_STATE,
  UPDATE_TAKE_QUIZ,
} from '../../graphql';
import {
  ScratchState,
  StudentLessonEntity,
  StudentLessonPage,
  StudentLessonWithCourse,
} from '@/domains/student-lesson/entities';
import { StudentLessonRepository } from '@/domains/student-lesson/ports/repositories';
import { HttpClientAdapter } from '@/graphql/http-client-adapter';
import {
  FindStudentLessonPayload,
  TakeQuizPayload,
  UpdateLearningProgressPayload,
  UpdateScratchStatePayload,
} from '@/domains/student-lesson/ports/payloads';

export class StudentLessonHttpRepository implements StudentLessonRepository {
  async updateLearningProgress(payload: UpdateLearningProgressPayload) {
    HttpClientAdapter.mutate<StudentLessonPage>({
      mutation: UPDATE_LEARNING_PROGRESS,
      variables: { payload: { ...payload } },
    });
  }

  async takeQuiz(payload: TakeQuizPayload) {
    HttpClientAdapter.mutate<StudentLessonPage>({
      mutation: UPDATE_TAKE_QUIZ,
      variables: { payload: { ...payload } },
    });
  }

  async findOne(id: string): Promise<StudentLessonEntity> {
    return HttpClientAdapter.query<StudentLessonEntity>({
      query: GET_STUDENT_LESSON,
      dataKey: 'StudentLesson_findOne',
      variables: { id },
    });
  }

  async findAll(payload?: FindStudentLessonPayload | undefined): Promise<StudentLessonWithCourse> {
    return HttpClientAdapter.query<StudentLessonWithCourse>({
      query: GET_STUDENT_LESSON_LIST,
      dataKey: 'StudentLesson_find',
      variables: { payload },
    });
  }

  async getCurrentScratchState(id: string): Promise<ScratchState> {
    return HttpClientAdapter.query<ScratchState>({
      query: GET_SCRATCH_STATE,
      dataKey: 'StudentLesson_getCurrentScratchState',
      variables: { id },
    });
  }

  async updateScratchState(payload: UpdateScratchStatePayload) {
    HttpClientAdapter.mutate<ScratchState>({
      mutation: UPDATE_SCRATCH_STATE,
      variables: { payload: { ...payload } },
    });
  }
}
