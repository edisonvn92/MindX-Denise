import { GTMEvent } from '.';

export const pushPictureAndTextData = (data: Record<string, unknown>): GTMEvent => {
  return {
    event: 'picture_and_text',
    ...data,
    _clear: true,
  };
};
