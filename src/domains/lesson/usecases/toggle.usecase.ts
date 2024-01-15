import { LessonEntity } from '../entities';
import { ToggleLessonPayload } from '../ports/payloads';
import { LessonRepository } from '../ports/repositories';

export class ToggleLessonUseCase {
  constructor(private readonly repo: LessonRepository) {}

  async run(payload: ToggleLessonPayload): Promise<LessonEntity> {
    return this.repo.toggleLesson(payload);
  }
}
