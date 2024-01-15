// Generate code from clean architecture template

import { MentorEntity } from '../entities';
import { MentorRepository } from '../ports/repositories';

export class FindOneMentorUseCase {
  constructor(private readonly repo: MentorRepository) {}

  async run(id: string): Promise<MentorEntity> {
    return this.repo.findOne(id);
  }
}
