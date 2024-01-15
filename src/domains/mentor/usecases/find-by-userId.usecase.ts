import { MentorEntity } from '../entities';
import { MentorRepository } from '../ports/repositories';

export class FindOneMentorByUserIdUseCase {
  constructor(private readonly repo: MentorRepository) {}

  async run(userId: string): Promise<MentorEntity> {
    return this.repo.findByUserId(userId);
  }
}
