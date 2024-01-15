// Generate code from clean architecture template

import { UserEntity } from '../entities';
import { UserRepository } from '../ports/repositories';

export class FindCurrentUserUseCase {
  constructor(private readonly repo: UserRepository) {}

  async run(): Promise<{ dataDetail: UserEntity }> {
    const { dataDetail } = await this.repo.findCurrent();

    return { dataDetail };
  }
}
