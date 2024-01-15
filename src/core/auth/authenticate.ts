import { get } from 'lodash';
import { getAuth, signInWithCustomToken } from 'firebase/auth';

export const authenticate = async (customToken: string) => {
  const auth = getAuth();
  const userCredentials = await signInWithCustomToken(auth, customToken);
  const userId = get(userCredentials, 'user.uid');
  return { userId };
};
