import { CancelSupportPayload } from '../ports/payloads';
import { SupportRepository } from '../ports/repositories';

export class CancelSupportUseCase {
  constructor(private readonly repo: SupportRepository) {}

  async run(payload: CancelSupportPayload) {
    this.repo.cancel(payload);
  }
}
