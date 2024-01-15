// Generate code from clean architecture template
/* eslint-disable @typescript-eslint/no-empty-interface */

export interface StudentStatusFilter {
  orderBy: string | 'studentName';
  order: string | 'DESC';
  status?: string;
  courseId?: string;
  studentName?: string;
}
export interface QueryRealtimeDashboardPayload {}
