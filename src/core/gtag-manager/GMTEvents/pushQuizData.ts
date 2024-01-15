import { GTMEvent } from '.';

export const pushQuizData = (data: Record<string, unknown>): GTMEvent => {
  return {
    event: 'quiz_data',
    ...data,
    _clear: true,
  };
};
