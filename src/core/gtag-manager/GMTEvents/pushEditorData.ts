import { GTMEvent } from '.';

export const pushEditorData = (data: Record<string, unknown>): GTMEvent => {
  return {
    event: 'edittor_data',
    ...data,
    _clear: true,
  };
};
