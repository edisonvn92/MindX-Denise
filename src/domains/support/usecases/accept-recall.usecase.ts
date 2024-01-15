import { AcceptRecallRequestPayload } from '../ports/payloads/recall.payload';
import { SupportRepository } from '../ports/repositories';

export class AcceptRecallRequestUseCase {
  constructor(private readonly repo: SupportRepository) {}

  async run(payload: AcceptRecallRequestPayload) {
    this.repo.acceptRecall(payload);
  }
}
