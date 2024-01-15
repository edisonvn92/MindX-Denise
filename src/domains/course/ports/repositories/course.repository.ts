// Generate code from clean architecture template

import {
  CreateCoursePayload,
  QueryCoursePayload,
  ToggleCoursePayload,
  UpdateCoursePayload,
} from '../payloads';
import { CourseEntity } from '../../entities';

export interface CourseRepository {
  createCourse(payload: CreateCoursePayload): Promise<CourseEntity>;
  getListCourse(payload?: QueryCoursePayload): Promise<CourseEntity[]>;
  updateCourse(payload: UpdateCoursePayload): Promise<CourseEntity>;
  getCourseDetail(id: string): Promise<CourseEntity>;
  toggleCourse(payload: ToggleCoursePayload): Promise<CourseEntity>;
}
