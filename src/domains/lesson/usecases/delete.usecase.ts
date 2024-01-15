import { LessonEntity } from '../entities';
import { LessonRepository } from '../ports/repositories';

export class DeleteLessonUseCase {
  constructor(private readonly repo: LessonRepository) {}

  async run(id: string): Promise<LessonEntity> {
    return this.repo.deleteLesson(id);
  }
}
