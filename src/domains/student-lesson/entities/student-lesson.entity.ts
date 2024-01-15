// Generate code from clean architecture template
/* eslint-disable @typescript-eslint/no-empty-interface */

// eslint-disable-next-line no-shadow
export enum LessonStatus {
  NotStarted = 'NOT_STARTED',
  Inprogress = 'IN_PROGRESS',
  Completed = 'COMPLETED',
}

// eslint-disable-next-line no-shadow
export enum PageType {
  Cover = 'COVER',
  PictureAndText = 'PICTURE_AND_TEXT',
  Video = 'VIDEO',
  Quiz = 'QUIZ',
}

// eslint-disable-next-line no-shadow
export enum PageStatus {
  NotStarted = 'NOT_STARTED',
  Inprogress = 'IN_PROGRESS',
  Completed = 'COMPLETED',
}

export interface CourseMinimum {
  id: string;
  name: string;
  code: string;
}

export interface StudentPageCoverContent {
  logo?: string;
  lessonNumber?: number;
  lessonName?: string;
  learnTime?: number;
  coverImage?: string;
}

export interface StudentPagePictureAndTextContent {
  introductionPicture: string;
  hasIntroductionPicture?: boolean;
  content: string;
}

export interface StudentPageVideoContent {
  video: string;
}

export interface StudentPageAnswerContent {
  content: string;
  isCorrect: boolean;
  isChosen?: boolean;
}

export interface StudentPageQuizContent {
  hasIntroductionImage: boolean;
  introductionImage: string;
  quizContent: string;
  hasExplain: boolean;
  explain: string;
  answers: StudentPageAnswerContent[];
  correctAnswer?: number;
}
export interface LessonMinimumEntity {
  id: string;
  name: string;
  learnTime: number;
}
export interface StudentLessonPage {
  pageId: string;
  pageNumber: number;
  pageName: string;
  type: PageType;
  displayOrder: number;
  content:
    | StudentPageCoverContent
    | StudentPagePictureAndTextContent
    | StudentPageVideoContent
    | StudentPageQuizContent;
  status: PageStatus;
}
export interface StudentLessonEntity {
  id: string;
  courseId: string;
  nextStudentLessonId?: string;
  nextLesson?: {
    id: string;
    name: string;
    learnTime: number;
  };
  lessonId: string;
  studentId: string;
  displayOrder: number;
  status: LessonStatus;
  lesson?: LessonMinimumEntity;
  learningProgresses?: StudentLessonPage[];
}
export interface StudentLessonWithCourse {
  lessons: StudentLessonEntity[];
  course: CourseMinimum;
}

export interface ScratchState {
  id: string;
  studentId: string;
  lessonId: string;
  courseId: string;
  scratchState: string;
}
