// Generate code from clean architecture template
/* eslint-disable @typescript-eslint/no-empty-interface */

import { MentorStatus } from '../../entities';

export interface CreateMentorPayload {}
export interface QueryMentorPayload {}

export interface ChangeStatusMentorPayLoad {
  id: string;
  status: MentorStatus;
}
