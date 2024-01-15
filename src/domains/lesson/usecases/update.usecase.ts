import { LessonEntity } from '../entities';
import { LessonPayload } from '../ports/payloads';
import { LessonRepository } from '../ports/repositories';

export class UpdateLessonUseCase {
  constructor(private readonly repo: LessonRepository) {}

  async run(payload: LessonPayload): Promise<LessonEntity> {
    return this.repo.updateLesson(payload);
  }
}
