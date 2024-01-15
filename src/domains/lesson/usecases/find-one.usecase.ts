// Generate code from clean architecture template

import { LessonEntity } from '../entities';
import { LessonRepository } from '../ports/repositories';

export class FindOneLessonUseCase {
  constructor(private readonly repo: LessonRepository) {}

  async run(id: string): Promise<LessonEntity> {
    return this.repo.findLesson(id);
  }
}
