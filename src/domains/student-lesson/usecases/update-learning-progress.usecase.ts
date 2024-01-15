import { UpdateLearningProgressPayload } from '../ports/payloads';
import { StudentLessonRepository } from '../ports/repositories';

export class UpdateLearningProgressUseCase {
  constructor(private readonly repo: StudentLessonRepository) {}

  async run(payload: UpdateLearningProgressPayload) {
    this.repo.updateLearningProgress(payload);
  }
}
