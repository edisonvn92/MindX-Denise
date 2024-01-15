import { GTMEvent } from '.';

export const pushLiveSupportData = (data: Record<string, unknown>): GTMEvent => {
  return {
    event: 'live_support',
    ...data,
    _clear: true,
  };
};
