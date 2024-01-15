// Generate code from clean architecture template

import {
  CREATE_LESSON,
  DELETE_LESSON,
  GET_LESSON_DETAIL,
  TOGGLE_LESSON,
  UPDATE_LESSON,
} from '../../graphql';
import { LessonEntity } from '@/domains/lesson/entities';
import { LessonPayload, ToggleLessonPayload } from '@/domains/lesson/ports/payloads';
import { LessonRepository } from '@/domains/lesson/ports/repositories';
import { HttpClientAdapter } from '@/graphql/http-client-adapter';

export class LessonHttpRepository implements LessonRepository {
  async deleteLesson(id: string): Promise<LessonEntity> {
    const response = await HttpClientAdapter.mutate<LessonEntity>({
      mutation: DELETE_LESSON,
      variables: { id },
    });
    return response;
  }

  async toggleLesson(payload: ToggleLessonPayload): Promise<LessonEntity> {
    return HttpClientAdapter.mutate<LessonEntity>({
      mutation: TOGGLE_LESSON,
      variables: { payload: { ...payload } },
    });
  }

  async createLesson(payload: LessonPayload): Promise<LessonEntity> {
    const response = await HttpClientAdapter.mutate<LessonEntity>({
      mutation: CREATE_LESSON,
      variables: { payload: { ...payload } },
    });
    return response;
  }

  async updateLesson(payload: LessonPayload): Promise<LessonEntity> {
    return HttpClientAdapter.mutate<LessonEntity>({
      mutation: UPDATE_LESSON,
      variables: { payload: { ...payload } },
    });
  }

  async findLesson(id: string): Promise<LessonEntity> {
    const response: LessonEntity = await HttpClientAdapter.query<LessonEntity>({
      query: GET_LESSON_DETAIL,
      dataKey: 'Lesson_findOne',
      variables: { id },
    });
    return response;
  }
}
