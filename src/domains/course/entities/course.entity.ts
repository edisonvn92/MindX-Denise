// Generate code from clean architecture template
/* eslint-disable @typescript-eslint/no-empty-interface */

export interface CourseLesson {
  id: string;
  name: string;
  displayOrder: number;
  isActive: boolean;
  learnTime: number;
}
export interface CourseEntity {
  id: string;
  code: string;
  name: string;
  thumbnail: string;
  isActive?: boolean;
  lessons?: CourseLesson[];
}
