// Generate code from clean architecture template
/* eslint-disable */

export enum PageType {
  Cover = 'COVER',
  PictureAndText = 'PICTURE_AND_TEXT',
  Video = 'VIDEO',
  Quiz = 'QUIZ',
}

export enum contentMaxLength {
  lessonTitle = 60,
  sessionTitle = 60,
  textContent = 300,
  quizQuestion = 150,
  quizAnswer = 120,
}

export interface CoverContent {
  logo?: string;
  lessonNumber?: number;
  lessonName?: string;
  learnTime?: number;
  coverImage?: string;
}

export interface PictureAndTextContent {
  introductionPicture: string;
  hasIntroductionPicture: boolean;
  content: string;
}

export interface VideoContent {
  video: string;
}

export interface AnswerContent {
  content: string;
  isCorrect: boolean;
}

export interface QuizContent {
  hasIntroductionImage: boolean;
  introductionImage: string;
  quizContent: string;
  hasExplain: boolean;
  explain: string;
  answers: AnswerContent[];
  correctAnswer?: number;
}

export type PageContent = CoverContent | PictureAndTextContent | VideoContent | QuizContent;
export interface LessonPage {
  id?: string;
  pageNumber?: number;
  pageName?: string;
  type: PageType;
  displayOrder: number;
  content?: CoverContent | PictureAndTextContent | VideoContent | QuizContent;
}

export interface LessonEntity {
  id: string;
  name: string;
  displayOrder: number;
  isActive: boolean;
  learnTime: number;
  totalPage: number;
  pages: LessonPage[];
  courseId: string;
}
/* eslint-disable */
