// Generate code from clean architecture template

import { UserEntity } from '../entities';
import { QueryUserPayload } from '../ports/payloads';
import { UserRepository } from '../ports/repositories';

export class FindAllUserUsecase {
  constructor(private readonly repo: UserRepository) {}

  async run(payload: QueryUserPayload): Promise<UserEntity> {
    throw new Error('Method not implemented.');
  }
}
