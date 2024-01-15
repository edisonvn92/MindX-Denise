// Generate code from clean architecture template

import {
  AcceptSupportRequestPayload,
  CancelSupportPayload,
  EvaluateSupportPayload,
  FinishSupportPayload,
  QuerySupportPayload,
  RejectSupportRequestPayload,
  RequestSupportPayload,
} from '../payloads';
import { SupportEntity } from '../../entities';
import {
  AcceptRecallRequestPayload,
  CancelRecallPayload,
  RejectRecallRequestPayload,
  RequestRecallPayload,
} from '../payloads/recall.payload';

export interface SupportRepository {
  request(payload: RequestSupportPayload): Promise<SupportEntity>;
  cancel(payload: CancelSupportPayload): void;
  findByMentorId(payload: QuerySupportPayload): Promise<SupportEntity[]>;
  rejectRequest(payload: RejectSupportRequestPayload): void;
  acceptRequest(payload: AcceptSupportRequestPayload): void;
  finish(payload: FinishSupportPayload): void;
  evaluate(payload: EvaluateSupportPayload): void;
  recall(payload: RequestRecallPayload): Promise<SupportEntity>;
  cancelRecall(payload: CancelRecallPayload): void;
  rejectRecall(payload: RejectRecallRequestPayload): void;
  acceptRecall(payload: AcceptRecallRequestPayload): void;
}
