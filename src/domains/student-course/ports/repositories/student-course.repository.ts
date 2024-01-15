// Generate code from clean architecture template

import { QueryStudentCoursePayload } from '../payloads';
import { StudentCourseEntity } from '../../entities';

export interface StudentCourseRepository {
  findAll(payload: QueryStudentCoursePayload): Promise<StudentCourseEntity[]>;
}
