// Generate code from clean architecture template

import { LessonEntity } from '../entities';
import { LessonPayload } from '../ports/payloads';
import { LessonRepository } from '../ports/repositories';

export class CreateLessonUseCase {
  constructor(private readonly repo: LessonRepository) {}

  async run(payload: LessonPayload): Promise<LessonEntity> {
    return this.repo.createLesson(payload);
  }
}
