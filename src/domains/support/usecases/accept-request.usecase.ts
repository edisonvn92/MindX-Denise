import { AcceptSupportRequestPayload } from '../ports/payloads';
import { SupportRepository } from '../ports/repositories';

export class AcceptRequestSupportUseCase {
  constructor(private readonly repo: SupportRepository) {}

  async run(payload: AcceptSupportRequestPayload) {
    this.repo.acceptRequest(payload);
  }
}
