// Generate code from clean architecture template
/* eslint-disable @typescript-eslint/no-empty-interface */

export interface CreateSupportPayload {}
export interface QuerySupportPayload {}
export interface RequestSupportPayload {
  studentId: string;
  mentorUid: string;
  lessonId: string;
  question: string;
  peerId: string;
  liveBlockId: string;
}

export interface CancelSupportPayload {
  id: string;
  studentId: string;
}

export interface FindSupportByMentorIdInput {
  mentorUid: string;
  isCompleted?: boolean;
}

export interface RejectSupportRequestPayload {
  id: string;
  mentorUid: string;
}

export interface AcceptSupportRequestPayload {
  id: string;
  mentorUid: string;
}

export interface FinishSupportPayload {
  id: string;
  mentorUid: string;
}

export interface EvaluateSupportPayload {
  id: string;
  mentorUid: string;
  isSatisfied: boolean;
}
