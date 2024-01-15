// Generate code from clean architecture template

import { StudentLessonEntity } from '../entities';
import { StudentLessonRepository } from '../ports/repositories';

export class FindOneStudentLessonUseCase {
  constructor(private readonly repo: StudentLessonRepository) {}

  async run(id: string): Promise<StudentLessonEntity> {
    return this.repo.findOne(id);
  }
}
