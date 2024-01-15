// Generate code from clean architecture template
/* eslint-disable @typescript-eslint/no-empty-interface */

export interface RealtimeDashboardEntity {
  countOnlineMentors: number;
  countOnlineStudents: number;
  countStruggleSupport: number;
}

export interface StudentAction {
  time: string;
  status: string;
  reason: string;
  question?: string;
  mentor?: string;
  courseName: string;
  lessonName: string;
}
export interface StudentStatusEntity {
  studentName: string;
  studentAvatar: string;
  isError?: boolean;
  actions: StudentAction[];
}

/* eslint-disable */
export enum StudentStatusEnum {
  Studying = 'studying',
  WaitingForSupport = 'waitingForSupport',
  NotBeFoundMentor = 'notBeFoundMentor',
  BeSupporting = 'beSupporting',
  Offline = 'offline',
  Online = 'online',
}

export const UserLessonStatus = [
  StudentStatusEnum.Studying,
  StudentStatusEnum.WaitingForSupport,
  StudentStatusEnum.NotBeFoundMentor,
  StudentStatusEnum.BeSupporting,
  StudentStatusEnum.Offline,
];

export enum MentorStatusEnum {
  Offline = 'offline',
  Available = 'available',
  Supporting = 'supporting',
  Buzy = 'buzy',
}

export enum EventCommand {
  Connection = 'Connection',
  Connect = 'connect',
  Disconnect = 'disconnect',
  UserStatus = 'user_status',
  StudentLearn = 'student_learn',
  StudentSupport = 'student_support',
  MentorSupport = 'mentor_support',
  CxOMonitorStudent = 'cxo_monitor_student',
  CxOMonitorMentor = 'cxo_monitor_mentor',

  // Support Recall Request
  SupportMentor = 'support_mentor',
}
/* eslint-disable */
