// Generate code from clean architecture template

import { LessonPayload, ToggleLessonPayload } from '../payloads';
import { LessonEntity } from '../../entities';

export interface LessonRepository {
  createLesson(payload: LessonPayload): Promise<LessonEntity>;
  updateLesson(payload: LessonPayload): Promise<LessonEntity>;
  findLesson(id: string): Promise<LessonEntity>;
  toggleLesson(payload: ToggleLessonPayload): Promise<LessonEntity>;
  deleteLesson(id: string): Promise<LessonEntity>;
}
