// Generate code from clean architecture template
/* eslint-disable @typescript-eslint/no-empty-interface */

import { PageStatus } from '../../entities';

export interface FindStudentLessonPayload {
  courseId: string;
  studentId: string;
}

export interface UpdateLearningProgressPayload {
  id: string;
  pageId: string;
  studentId: string;
  status: PageStatus;
}

export interface TakeQuizAnswerInput {
  content: string;
  isCorrect: boolean;
  isChosen: boolean;
}
export interface TakeQuizPayload {
  id: string;
  pageId: string;
  answers: TakeQuizAnswerInput[];
}

export interface UpdateScratchStatePayload {
  id: string;
  state: string;
}
