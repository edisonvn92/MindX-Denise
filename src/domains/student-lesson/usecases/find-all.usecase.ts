// Generate code from clean architecture template

import { StudentLessonRepository } from '../ports/repositories';
import { FindStudentLessonPayload } from '../ports/payloads';
import { StudentLessonWithCourse } from '../entities';

export class FindAllStudentLessonUseCase {
  constructor(private readonly repo: StudentLessonRepository) {}

  async run(payload: FindStudentLessonPayload): Promise<StudentLessonWithCourse> {
    return this.repo.findAll(payload);
  }
}
