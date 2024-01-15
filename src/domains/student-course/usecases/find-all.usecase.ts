// Generate code from clean architecture template

import { StudentCourseEntity } from '../entities';
import { QueryStudentCoursePayload } from '../ports/payloads';
import { StudentCourseRepository } from '../ports/repositories';

export class FindAllStudentCourseUsecase {
  constructor(private readonly repo: StudentCourseRepository) {}

  async run(payload: QueryStudentCoursePayload): Promise<StudentCourseEntity[]> {
    return this.repo.findAll(payload);
  }
}
