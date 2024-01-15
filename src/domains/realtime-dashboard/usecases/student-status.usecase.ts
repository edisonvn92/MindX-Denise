// Generate code from clean architecture template

import { StudentStatusEntity } from '../entities';
import { StudentStatusFilter } from '../ports/payloads';
import { RealtimeDashboardRepository } from '../ports/repositories';

export class GetAllStudentStatusUsecase {
  constructor(private readonly repo: RealtimeDashboardRepository) {}

  async run(filter: StudentStatusFilter): Promise<StudentStatusEntity[]> {
    return this.repo.getAllStudentStatus(filter);
  }
}
