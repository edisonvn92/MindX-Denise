// Generate code from clean architecture template

import {
  CREATE_COURSE,
  GET_COURSE_DETAIL,
  GET_COURSE_LIST,
  TOGGLE_COURSE,
  UPDATE_COURSE,
} from '../../graphql';
import { CourseEntity } from '@/domains/course/entities';
import {
  CreateCoursePayload,
  ToggleCoursePayload,
  UpdateCoursePayload,
} from '@/domains/course/ports/payloads';
import { CourseRepository } from '@/domains/course/ports/repositories';
import { HttpClientAdapter } from '@/graphql/http-client-adapter';

export class CourseHttpRepository implements CourseRepository {
  async toggleCourse(payload: ToggleCoursePayload): Promise<CourseEntity> {
    const response = await HttpClientAdapter.mutate<CourseEntity>({
      mutation: TOGGLE_COURSE,
      variables: { payload: { ...payload } },
    });
    return response;
  }

  async createCourse(payload: CreateCoursePayload): Promise<CourseEntity> {
    const response = await HttpClientAdapter.mutate<CourseEntity>({
      mutation: CREATE_COURSE,
      variables: { payload: { ...payload } },
    });
    return response;
  }

  async getListCourse(): Promise<CourseEntity[]> {
    const response: CourseEntity[] = await HttpClientAdapter.query<CourseEntity[]>({
      query: GET_COURSE_LIST,
      dataKey: 'Course_getAll',
    });
    return response;
  }

  async updateCourse(payload: UpdateCoursePayload): Promise<CourseEntity> {
    const response = await HttpClientAdapter.mutate<CourseEntity>({
      mutation: UPDATE_COURSE,
      variables: { payload: { ...payload } },
    });
    return response;
  }

  async getCourseDetail(id: string): Promise<CourseEntity> {
    // return Promise.resolve(dataFake[0]);
    const response: CourseEntity = await HttpClientAdapter.query<CourseEntity>({
      query: GET_COURSE_DETAIL,
      dataKey: 'Course_getById',
      variables: { id },
    });
    return response;
  }
}
