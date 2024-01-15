import 'firebase/auth';
import { cloneDeep, set } from 'lodash';

export const getAuthHttp = (idToken: string) => {
  return {
    fetch: (url: RequestInfo | URL, option: RequestInit): Promise<Response> => {
      const clonedOption = cloneDeep(option);
      set(clonedOption, 'headers.Authorization', `Bearer ${idToken}`);
      return fetch(url, option);
    },
  };
};
