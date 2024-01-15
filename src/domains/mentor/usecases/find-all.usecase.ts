// Generate code from clean architecture template

import { MentorEntity } from '../entities';
import { QueryMentorPayload } from '../ports/payloads';
import { MentorRepository } from '../ports/repositories';

export class FindAllMentorUsecase {
  constructor(private readonly repo: MentorRepository) {}

  async run(payload: QueryMentorPayload): Promise<MentorEntity> {
    throw new Error('Method not implemented.');
  }
}
