import { gql } from '@apollo/client';
import { SupportData } from './support-data';

export const GET_SUPPORT_BY_MENTOR_ID = gql`
  query Support_findByMentorId($payload: FindSupportByMentorIdInput!) {
    Support_findByMentorId(filter: $payload) {
      ${SupportData}
    }
  }
`;

export const REQUEST_SUPPORT = gql`
  mutation Support_request($payload: RequestSupportInput!) {
    Support_request(requestSupportInput: $payload) {
      id
      studentId
      mentorUid
      peerId
      status
      question
    }
  }
`;

export const CANCEL_SUPPORT = gql`
  mutation Support_cancel($payload: CancelSupportInput!) {
    Support_cancel(cancelSupportInput: $payload) {
      id
    }
  }
`;

export const REJECT_SUPPORT_REQUEST = gql`
  mutation Support_reject($payload: RejectSupportInput!) {
    Support_reject(rejectSupportInput: $payload) {
      id
    }
  }
`;

export const ACCEPT_SUPPORT_REQUEST = gql`
  mutation Support_accept($payload: AcceptSupportInput!) {
    Support_accept(acceptSupportInput: $payload) {
      id
    }
  }
`;

export const FINISH_SUPPORT = gql`
  mutation Support_finish($payload: FinishSupportInput!) {
    Support_finish(finishSupportInput: $payload) {
      id
    }
  }
`;

export const EVALUATE_SUPPORT = gql`
  mutation Support_evaluate($payload: EvaluateSupportInput!) {
    Support_evaluate(evaluateSupportInput: $payload) {
      id
    }
  }
`;

export const RECALL_REQUEST = gql`
  mutation Support_recall($payload: RecallSupportInput!) {
    Support_recall(recallSupportInput: $payload) {
      id
      mentorUid
      studentId
      peerId
      status
      question
    }
  }
`;

export const CANCEL_RECALL = gql`
  mutation Support_cancelRecall($payload: CancelSupportInput!) {
    Support_cancelRecall(cancelRecallInput: $payload) {
      id
      studentId
      mentorUid
      peerId
    }
  }
`;

export const REJECT_RECALL_REQUEST = gql`
  mutation Support_reject($payload: RejectSupportInput!) {
    Support_reject(rejectSupportInput: $payload) {
      id
      studentId
      mentorUid
      peerId
    }
  }
`;

export const ACCEPT_RECALL_REQUEST = gql`
  mutation Support_acceptRecall($payload: AcceptRecallSupportInput!) {
    Support_acceptRecall(acceptRecallInput: $payload) {
      id
      studentId
      mentorUid
      peerId
    }
  }
`;
