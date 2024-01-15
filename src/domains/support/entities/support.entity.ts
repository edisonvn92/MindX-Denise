// Generate code from clean architecture template
/* eslint-disable @typescript-eslint/no-empty-interface */

// eslint-disable-next-line no-shadow
export enum SupportStatus {
  NEW = 'NEW',
  ASSIGNED = 'ASSIGNED',
  ACCEPTED = 'ACCEPTED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}
// eslint-disable-next-line no-shadow
export enum SupportType {
  LIVE = 'LIVE',
  MISSED = 'MISSED',
}

export interface SupportEntity {
  id: string;
  studentId: string;
  studentName?: string;
  studentAvatar?: string;
  mentorUid: string;
  courseName?: string;
  lessonName: string;
  status: SupportStatus;
  question: string;
  peerId: string;
  liveBlockId: string;
  rate: number;
  isSatisfied: boolean;
  rejectedMentorUids: string[];
  createdAt: Date;
  type?: SupportType;
}

export interface ChatContent {
  content: string;
  author: string;
  authorName: string;
  createdTime: Date;
}
