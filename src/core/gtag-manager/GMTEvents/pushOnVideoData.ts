import { GTMEvent } from '.';

export const pushOnVideoData = (data: Record<string, unknown>): GTMEvent => {
  return {
    event: 'on_video',
    ...data,
    _clear: true,
  };
};
