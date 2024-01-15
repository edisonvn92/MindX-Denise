// Generate code from clean architecture template

import { GET_MENTOR_BY_ID, GET_MENTOR_BY_USER_ID } from '../../graphql';
import { MentorRepository } from '@/domains/mentor/ports/repositories';
import { MentorEntity } from '@/domains/mentor/entities';
import { CreateMentorPayload, QueryMentorPayload } from '@/domains/mentor/ports/payloads';
import { HttpClientAdapter } from '@/graphql/http-client-adapter';

export class MentorHttpRepository implements MentorRepository {
  create(payload: CreateMentorPayload): Promise<MentorEntity> {
    throw new Error('Method not implemented.');
  }

  findAll(payload: QueryMentorPayload): Promise<MentorEntity[]> {
    throw new Error('Method not implemented.');
  }

  findOne(id: string): Promise<MentorEntity> {
    return HttpClientAdapter.query<MentorEntity>({
      query: GET_MENTOR_BY_ID,
      dataKey: 'Mentor_findByUserId',
      variables: { id },
    });
  }

  findByUserId(userId: string): Promise<MentorEntity> {
    return HttpClientAdapter.query<MentorEntity>({
      query: GET_MENTOR_BY_USER_ID,
      dataKey: 'Mentor_findByUserId',
      variables: { userId },
    });
  }
}
