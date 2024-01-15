import { UpdateScratchStatePayload } from '../ports/payloads';
import { StudentLessonRepository } from '../ports/repositories';

export class UpdateScratchStateUseCase {
  constructor(private readonly repo: StudentLessonRepository) {}

  async run(payload: UpdateScratchStatePayload) {
    this.repo.updateScratchState(payload);
  }
}
