import { gql } from '@apollo/client';
import { overviewData, studentStatusData } from './overview-data';

export const GET_DATA_OVERVIEW = gql`
query Report_realtimeStudent {
  Report_realtimeOverview {
      ${overviewData}
  }
}
`;

export const GET_STUDENT_STATUS_DATA = gql`
query Report_realtimeStudent($filter: FilterRealtimeStudent!) {
  Report_realtimeStudent(filter: $filter) {
      ${studentStatusData}
  }
}
`;
