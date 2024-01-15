import { CancelRecallPayload } from '../ports/payloads/recall.payload';
import { SupportRepository } from '../ports/repositories';

export class CancelRecallUseCase {
  constructor(private readonly repo: SupportRepository) {}

  async run(payload: CancelRecallPayload) {
    this.repo.cancelRecall(payload);
  }
}
