// Generate code from clean architecture template

import { MentorHttpRepository } from '../adapters/repositories';
import { QueryMentorPayload } from '@/domains/mentor/ports/payloads';
import { FindAllMentorUsecase } from '@/domains/mentor/usecases';

export default function MentorViewModel() {
  const findAllUC = new FindAllMentorUsecase(new MentorHttpRepository());

  const actionGetAll = (payload?: QueryMentorPayload) => {
    // todo
  };
}
