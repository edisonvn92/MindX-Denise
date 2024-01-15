import { SupportEntity } from '../entities';
import { RequestSupportPayload } from '../ports/payloads';
import { SupportRepository } from '../ports/repositories';

export class RequestSupportUseCase {
  constructor(private readonly repo: SupportRepository) {}

  async run(payload: RequestSupportPayload): Promise<SupportEntity> {
    return this.repo.request(payload);
  }
}
