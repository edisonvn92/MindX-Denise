// Generate code from clean architecture template
/* eslint-disable @typescript-eslint/no-empty-interface */

import {
  CoverContent,
  PageType,
  PictureAndTextContent,
  QuizContent,
  VideoContent,
} from '../../entities';

export interface PageParams {
  id?: string;
  pageNumber?: number;
  pageName?: string;
  type: PageType;
  displayOrder: number;
  coverParam?: CoverContent;
  pictureAndTextParam?: PictureAndTextContent;
  videoParam?: VideoContent;
  quizParam?: QuizContent;
}

export interface LessonPayload {
  lesson: {
    id?: string;
    courseId?: string;
    displayOrder: number;
    isActive: boolean;
    name: string;
    totalPage: number;
  };
  pages: PageParams[];
}

export interface UpdateLessonPayload {
  lesson: {
    id: string;
    courseId: string;
    displayOrder: number;
    isActive: boolean;
    name: string;
    totalPage: number;
  };
  pages: PageParams[];
}

export interface ToggleLessonPayload {
  id: string;
  isActive: boolean;
}

export interface QueryLessonPayload {}
