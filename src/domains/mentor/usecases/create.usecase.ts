// Generate code from clean architecture template

import { MentorEntity } from '../entities';
import { CreateMentorPayload } from '../ports/payloads';
import { MentorRepository } from '../ports/repositories';

export class CreateMentorUsecase {
  constructor(private readonly repo: MentorRepository) {}

  async run(payload: CreateMentorPayload): Promise<MentorEntity> {
    throw new Error('Method not implemented.');
  }
}
