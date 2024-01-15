// Generate code from clean architecture template
/* eslint-disable @typescript-eslint/no-empty-interface */

export interface CreateSupportPayload {}
export interface QuerySupportPayload {}
export interface RequestRecallPayload {
  id: string;
  mentorUid: string;
  peerId: string;
}

export interface CancelRecallPayload {
  id: string;
  mentorUid: string;
}

export interface RejectRecallRequestPayload {
  id: string;
  studentId: string;
}

export interface AcceptRecallRequestPayload {
  id: string;
  studentId: string;
}

export interface FinishRecallPayload {
  id: string;
  mentorId: string;
}

export interface EvaluateRecallPayload {
  id: string;
  mentorId: string;
  isSatisfied: boolean;
}
