// Generate code from clean architecture template

import { SupportEntity } from '../entities';
import { FindSupportByMentorIdInput } from '../ports/payloads';
import { SupportRepository } from '../ports/repositories';

export class FindByMentorIdSupportUsecase {
  constructor(private readonly repo: SupportRepository) {}

  async run(payload: FindSupportByMentorIdInput): Promise<SupportEntity[]> {
    return this.repo.findByMentorId(payload);
  }
}
