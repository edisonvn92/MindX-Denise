// Generate code from clean architecture template

import { RealtimeDashboardEntity, StudentStatusEntity } from '../../entities';
import { StudentStatusFilter } from '../payloads';

export interface RealtimeDashboardRepository {
  findAll(): Promise<RealtimeDashboardEntity[]>;
  getAllStudentStatus(filter: StudentStatusFilter): Promise<StudentStatusEntity[]>;
}
