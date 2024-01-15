// Generate code from clean architecture template
/* eslint-disable @typescript-eslint/no-empty-interface */

// eslint-disable-next-line no-shadow
export enum MentorStatus {
  Available = 'AVAILABLE',
  Busy = 'BUSY',
  Offline = 'OFFLINE',
}

export interface TeachProfile {
  taughtSession: number;
  successSession: number;
  successRate: number;
  respondRate: number;
}
export interface MentorEntity {
  id: string;
  userId: string;
  status: MentorStatus;
  teachProfile: TeachProfile;
}
