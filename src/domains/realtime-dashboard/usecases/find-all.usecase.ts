// Generate code from clean architecture template

import { RealtimeDashboardEntity } from '../entities';
import { RealtimeDashboardRepository } from '../ports/repositories';

export class FindAllRealtimeDashboardUsecase {
  constructor(private readonly repo: RealtimeDashboardRepository) {}

  async run(): Promise<RealtimeDashboardEntity[]> {
    return this.repo.findAll();
  }
}
