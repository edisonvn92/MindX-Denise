// Generate code from clean architecture template

import {
  FindStudentLessonPayload,
  TakeQuizPayload,
  UpdateLearningProgressPayload,
  UpdateScratchStatePayload,
} from '../payloads';
import { ScratchState, StudentLessonEntity, StudentLessonWithCourse } from '../../entities';

export interface StudentLessonRepository {
  findAll(payload?: FindStudentLessonPayload): Promise<StudentLessonWithCourse>;
  findOne(id: string): Promise<StudentLessonEntity>;
  updateLearningProgress(payload: UpdateLearningProgressPayload): void;
  takeQuiz(payload: TakeQuizPayload): void;
  getCurrentScratchState(id: string): Promise<ScratchState>;
  updateScratchState(payload: UpdateScratchStatePayload): void;
}
