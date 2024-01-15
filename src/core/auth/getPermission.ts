import { gql } from '@apollo/client';
import { config } from '@/config';
import { HttpClientAdapter } from '@/graphql/http-client-adapter';

export const getPermission = async () => {
  if (config.test?.env === 'local') {
    return config.test.userPermission;
  }
  try {
    const permissions = await HttpClientAdapter.query<string[]>({
      query: gql`
        query User_getPermission {
          User_getPermission
        }
      `,
      dataKey: 'User_getPermission',
    });

    return permissions;
  } catch (error) {
    return [];
  }
};
