// Generate code from clean architecture template

import { GET_DATA_OVERVIEW, GET_STUDENT_STATUS_DATA } from '../../graphql';
import {
  RealtimeDashboardEntity,
  StudentStatusEntity,
} from '@/domains/realtime-dashboard/entities';
import { StudentStatusFilter } from '@/domains/realtime-dashboard/ports/payloads';
import { RealtimeDashboardRepository } from '@/domains/realtime-dashboard/ports/repositories';
import { HttpClientAdapter } from '@/graphql/http-client-adapter';

export class RealtimeDashboardRepo implements RealtimeDashboardRepository {
  async findAll(): Promise<RealtimeDashboardEntity[]> {
    return HttpClientAdapter.query<RealtimeDashboardEntity[]>({
      query: GET_DATA_OVERVIEW,
      dataKey: 'Report_realtimeOverview',
    });
  }

  async getAllStudentStatus(filter: StudentStatusFilter): Promise<StudentStatusEntity[]> {
    return HttpClientAdapter.query<StudentStatusEntity[]>({
      query: GET_STUDENT_STATUS_DATA,
      dataKey: 'Report_realtimeStudent',
      variables: { filter },
    });
  }
}
