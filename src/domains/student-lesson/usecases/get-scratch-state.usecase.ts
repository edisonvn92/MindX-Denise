import { ScratchState } from '../entities';
import { StudentLessonRepository } from '../ports/repositories';

export class GetScratchStateUseCase {
  constructor(private readonly repo: StudentLessonRepository) {}

  async run(id: string): Promise<ScratchState> {
    return this.repo.getCurrentScratchState(id);
  }
}
