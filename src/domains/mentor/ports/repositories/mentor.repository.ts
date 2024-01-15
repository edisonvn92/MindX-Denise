// Generate code from clean architecture template

import { CreateMentorPayload, QueryMentorPayload } from '../payloads';
import { MentorEntity } from '../../entities';

export interface MentorRepository {
  create(payload: CreateMentorPayload): Promise<MentorEntity>;
  findAll(payload: QueryMentorPayload): Promise<MentorEntity[]>;
  findOne(id: string): Promise<MentorEntity>;
  findByUserId(userId: string): Promise<MentorEntity>;
}
