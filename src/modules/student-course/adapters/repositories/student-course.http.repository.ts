// Generate code from clean architecture template

import { GET_STUDENT_COURSE_LIST } from '../../graphql';
import { StudentCourseEntity } from '@/domains/student-course/entities';
import { QueryStudentCoursePayload } from '@/domains/student-course/ports/payloads';
import { StudentCourseRepository } from '@/domains/student-course/ports/repositories';
import { HttpClientAdapter } from '@/graphql/http-client-adapter';

export class StudentCourseHttpRepository implements StudentCourseRepository {
  async findAll(payload: QueryStudentCoursePayload): Promise<StudentCourseEntity[]> {
    const response: StudentCourseEntity[] = await HttpClientAdapter.query<StudentCourseEntity[]>({
      query: GET_STUDENT_COURSE_LIST,
      dataKey: 'Course_getAllByStudent',
    });
    return response;
  }
}
