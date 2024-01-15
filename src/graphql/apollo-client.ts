import { ApolloClient, InMemoryCache } from '@apollo/client';
import { getAuth } from 'firebase/auth';
import { apiUrl } from './config';
import { config } from '@/config';

export const initApolloClient = async (): Promise<ApolloClient<any>> => {
  let headers: any = {
    user_id: config.test?.userLocalID || '',
  };
  if (config.test?.env !== 'local') {
    const auth = getAuth();
    const idToken = await auth.currentUser?.getIdToken();
    headers = {
      Authorization: `Bearer ${idToken}`,
    };
  }

  return new ApolloClient({
    cache: new InMemoryCache({
      addTypename: false,
    }),
    uri: apiUrl,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
      },
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
    },
    headers,
  });
};
