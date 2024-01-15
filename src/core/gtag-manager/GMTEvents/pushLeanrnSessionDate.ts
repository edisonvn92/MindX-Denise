import { GTMEvent } from '.';

export const pushLeanrnSessionDate = (data: Record<string, unknown>): GTMEvent => {
  return {
    event: 'learn_session',
    ...data,
    _clear: true,
  };
};
