import { SupportEntity } from '../entities';
import { RequestRecallPayload } from '../ports/payloads/recall.payload';
import { SupportRepository } from '../ports/repositories';

export class RecallRequestUseCase {
  constructor(private readonly repo: SupportRepository) {}

  async run(payload: RequestRecallPayload): Promise<SupportEntity> {
    return this.repo.recall(payload);
  }
}
