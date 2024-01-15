// Generate code from clean architecture template

import { UserEntity } from '../entities';
import { UserRepository } from '../ports/repositories';

export class FindOneUserUseCase {
  constructor(private readonly repo: UserRepository) {}

  async run(id: string): Promise<{ dataDetail: UserEntity }> {
    const { dataDetail } = await this.repo.findOne(id);

    return { dataDetail };
  }
}
