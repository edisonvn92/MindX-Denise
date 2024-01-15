// Generate code from clean architecture template

import { FIND_PERMISSION, FIND_USER } from '../../graphql';
import { UserEntity } from '@/domains/user/entities';
import { UserRepository } from '@/domains/user/ports/repositories';
import { HttpClientAdapter } from '@/graphql/http-client-adapter';

export class UserHttpRepository implements UserRepository {
  async findCurrent(): Promise<{ dataDetail: UserEntity }> {
    const response: UserEntity = await HttpClientAdapter.query<UserEntity>({
      query: FIND_USER,
      dataKey: 'User_findOne',
    });
    return {
      dataDetail: response,
    };
  }

  async findOne(id: string): Promise<{ dataDetail: UserEntity }> {
    const response: UserEntity = await HttpClientAdapter.query<UserEntity>({
      query: FIND_USER,
      dataKey: 'User_findOne',
      variables: { id },
    });
    return {
      dataDetail: response,
    };
  }

  async getPermission(): Promise<string[]> {
    return HttpClientAdapter.query<string[]>({
      query: FIND_PERMISSION,
      dataKey: 'User_getPermission',
    });
  }
}
