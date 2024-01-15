// Generate code from clean architecture template
/* eslint-disable @typescript-eslint/no-empty-interface */

export interface CreateCoursePayload {
  code: string;
  name: string;
  thumbnail: string;
}

export interface UpdateCoursePayload {
  id: string;
  code: string;
  name: string;
  thumbnail: string;
}

export interface ToggleCoursePayload {
  id: string;
  isActive: boolean;
}

export interface QueryCoursePayload {}
