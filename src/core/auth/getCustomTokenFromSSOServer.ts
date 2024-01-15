import { get } from 'lodash';
import { config } from '@/config';

export const getCustomTokenFromSSOServer = async () => {
  const res = await fetch(config.base.authenticateUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      operationName: 'GetCustomToken',
      variables: {},
      query: 'mutation GetCustomToken{users{getCustomToken{customToken}}}',
    }),
  });
  const data = await res.json();
  return get(data, 'data.users.getCustomToken.customToken');
};
