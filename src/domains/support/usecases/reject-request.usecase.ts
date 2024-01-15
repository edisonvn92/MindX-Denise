import { RejectSupportRequestPayload } from '../ports/payloads';
import { SupportRepository } from '../ports/repositories';

export class RejectRequestSupportUseCase {
  constructor(private readonly repo: SupportRepository) {}

  async run(payload: RejectSupportRequestPayload) {
    this.repo.rejectRequest(payload);
  }
}
