// Generate code from clean architecture template
import { useState } from 'react';
import { useToast } from '@mx/ui';
import { SupportHttpRepository } from '../adapters/repositories';
import {
  AcceptSupportRequestPayload,
  FindSupportByMentorIdInput,
  RejectSupportRequestPayload,
} from '@/domains/support/ports/payloads';
import {
  AcceptRequestSupportUseCase,
  FindByMentorIdSupportUsecase,
  RejectRequestSupportUseCase,
} from '@/domains/support/usecases';
import { RecallRequestUseCase } from '@/domains/support/usecases/recall-request.usecase';
import { useAppContext, useBaseViewModel } from '@/core';
import { SupportEntity } from '@/domains/support/entities';
import {
  CancelRecallPayload,
  RequestRecallPayload,
} from '@/domains/support/ports/payloads/recall.payload';
import { CancelRecallUseCase } from '@/domains/support/usecases/cancel-recall.repository';

export default function SupportListViewModel() {
  const repo = new SupportHttpRepository();
  const findByMentorIdSupportUC = new FindByMentorIdSupportUsecase(repo);
  const rejectRequestUC = new RejectRequestSupportUseCase(repo);
  const acceptRequestUC = new AcceptRequestSupportUseCase(repo);
  const recallRequestUC = new RecallRequestUseCase(repo);
  const cancelRecallUC = new CancelRecallUseCase(repo);
  const { loading, error, catchAction } = useBaseViewModel();
  const [supportList, setSupportList] = useState<SupportEntity[]>([]);
  const { t, currentUser } = useAppContext();
  const toast = useToast();

  const actionGetSupportByMentorId: (payload: FindSupportByMentorIdInput) => Promise<any> = async (
    payload: FindSupportByMentorIdInput,
  ) => {
    await catchAction(async () => {
      const data = await findByMentorIdSupportUC.run(payload);
      setSupportList(data);
    });
  };

  const actionRejectRequestSupport = async (payload: RejectSupportRequestPayload) => {
    await catchAction(async () => {
      await rejectRequestUC.run(payload);
      await actionGetSupportByMentorId({
        mentorUid: currentUser?.id || '',
        isCompleted: false,
      }).then(() =>
        toast.addToast({ status: 'success', header: t('support:rejectRequestSuccessfully') }),
      );
    });
  };

  const actionAcceptRequestSupport = async (payload: AcceptSupportRequestPayload) => {
    await catchAction(async () => {
      await acceptRequestUC.run(payload);
    });
  };

  const actionRecallSupport = async (payload: RequestRecallPayload) => {
    await catchAction(async () => {
      await recallRequestUC.run(payload);
    });
  };

  const actionCancelRecallSupport = async (payload: CancelRecallPayload) => {
    await catchAction(async () => {
      await cancelRecallUC.run(payload);
    });
  };

  return {
    loading,
    error,
    supportList,
    actionGetSupportByMentorId,
    actionRejectRequestSupport,
    actionAcceptRequestSupport,
    actionRecallSupport,
    actionCancelRecallSupport,
  };
}
