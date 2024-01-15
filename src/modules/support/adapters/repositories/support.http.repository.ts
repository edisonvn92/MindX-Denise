// Generate code from clean architecture template
import {
  ACCEPT_RECALL_REQUEST,
  ACCEPT_SUPPORT_REQUEST,
  CANCEL_RECALL,
  CANCEL_SUPPORT,
  EVALUATE_SUPPORT,
  FINISH_SUPPORT,
  GET_SUPPORT_BY_MENTOR_ID,
  RECALL_REQUEST,
  REJECT_RECALL_REQUEST,
  REJECT_SUPPORT_REQUEST,
  REQUEST_SUPPORT,
} from '../../graphql';
import { SupportEntity } from '@/domains/support/entities';
import {
  AcceptSupportRequestPayload,
  CancelSupportPayload,
  EvaluateSupportPayload,
  FindSupportByMentorIdInput,
  FinishSupportPayload,
  RejectSupportRequestPayload,
  RequestSupportPayload,
} from '@/domains/support/ports/payloads';
import {
  AcceptRecallRequestPayload,
  CancelRecallPayload,
  RejectRecallRequestPayload,
  RequestRecallPayload,
} from '@/domains/support/ports/payloads/recall.payload';
import { SupportRepository } from '@/domains/support/ports/repositories';
import { HttpClientAdapter } from '@/graphql/http-client-adapter';

export class SupportHttpRepository implements SupportRepository {
  acceptRequest(payload: AcceptSupportRequestPayload): void {
    HttpClientAdapter.mutate<SupportEntity>({
      mutation: ACCEPT_SUPPORT_REQUEST,
      variables: { payload: { ...payload } },
    });
  }

  rejectRequest(payload: RejectSupportRequestPayload): void {
    HttpClientAdapter.mutate<SupportEntity>({
      mutation: REJECT_SUPPORT_REQUEST,
      variables: { payload: { ...payload } },
    });
  }

  finish(payload: FinishSupportPayload): void {
    HttpClientAdapter.mutate<SupportEntity>({
      mutation: FINISH_SUPPORT,
      variables: { payload: { ...payload } },
    });
  }

  async request(payload: RequestSupportPayload): Promise<SupportEntity> {
    const response = await HttpClientAdapter.mutate<SupportEntity>({
      mutation: REQUEST_SUPPORT,
      variables: { payload: { ...payload } },
    });
    return response;
  }

  cancel(payload: CancelSupportPayload): void {
    HttpClientAdapter.mutate<SupportEntity>({
      mutation: CANCEL_SUPPORT,
      variables: { payload: { ...payload } },
    });
  }

  evaluate(payload: EvaluateSupportPayload): void {
    HttpClientAdapter.mutate<SupportEntity>({
      mutation: EVALUATE_SUPPORT,
      variables: { payload: { ...payload } },
    });
  }

  async findByMentorId(payload: FindSupportByMentorIdInput): Promise<SupportEntity[]> {
    // return Promise.resolve(fakeSupportList);
    return HttpClientAdapter.query<SupportEntity[]>({
      query: GET_SUPPORT_BY_MENTOR_ID,
      dataKey: 'Support_findByMentorId',
      variables: { payload },
    });
  }

  async recall(payload: RequestRecallPayload): Promise<SupportEntity> {
    const response = await HttpClientAdapter.mutate<SupportEntity>({
      mutation: RECALL_REQUEST,
      variables: { payload: { ...payload } },
    });

    return response;
  }

  acceptRecall(payload: AcceptRecallRequestPayload): void {
    HttpClientAdapter.mutate<SupportEntity>({
      mutation: ACCEPT_RECALL_REQUEST,
      variables: { payload: { ...payload } },
    });
  }

  rejectRecall(payload: RejectRecallRequestPayload): void {
    HttpClientAdapter.mutate<SupportEntity>({
      mutation: REJECT_RECALL_REQUEST,
      variables: { payload: { ...payload } },
    });
  }

  cancelRecall(payload: CancelRecallPayload): void {
    HttpClientAdapter.mutate<SupportEntity>({
      mutation: CANCEL_RECALL,
      variables: { payload: { ...payload } },
    });
  }
}
