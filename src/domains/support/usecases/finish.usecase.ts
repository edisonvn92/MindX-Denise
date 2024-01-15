import { FinishSupportPayload } from '../ports/payloads';
import { SupportRepository } from '../ports/repositories';

export class FinishSupportUseCase {
  constructor(private readonly repo: SupportRepository) {}

  async run(payload: FinishSupportPayload) {
    this.repo.finish(payload);
  }
}
