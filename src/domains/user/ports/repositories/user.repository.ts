// Generate code from clean architecture template

import { UserEntity } from '../../entities';

export interface UserRepository {
  // findOne(): Promise<{ dataDetail: UserEntity }>;
  findOne(id: string): Promise<{ dataDetail: UserEntity }>;
  findCurrent(): Promise<{ dataDetail: UserEntity }>;
  getPermission(): Promise<string[]>;
}
