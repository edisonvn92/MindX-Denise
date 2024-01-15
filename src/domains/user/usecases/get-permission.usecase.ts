import { UserRepository } from '../ports/repositories';

export class GetUserPermissionsUseCase {
  constructor(private readonly repository: UserRepository) {}

  async run() {
    const data = await this.repository.getPermission();
    return data;
  }
}
