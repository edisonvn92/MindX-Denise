import { SupportEntity } from '../entities';
import { RejectRecallRequestPayload, RequestRecallPayload } from '../ports/payloads/recall.payload';
import { SupportRepository } from '../ports/repositories';

export class RejectRecallRequestUseCase {
  constructor(private readonly repo: SupportRepository) {}

  async run(payload: RejectRecallRequestPayload) {
    this.repo.rejectRecall(payload);
  }
}
