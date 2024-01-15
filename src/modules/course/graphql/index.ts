import { gql } from '@apollo/client';
import { CourseDetailData, CourseDetailDataWithLesson, CourseGeneralData } from './course-data';

export const GET_COURSE_LIST = gql`
query Course_getAll {
  Course_getAll {
      ${CourseGeneralData}
  }
}
`;

export const CREATE_COURSE = gql`
mutation Course_create($payload: CreateCourseInput!) {
  Course_create(createCourseInput: $payload) {
    ${CourseGeneralData}
  }
}
`;

export const UPDATE_COURSE = gql`
mutation Course_update($payload: UpdateCourseInput!) {
  Course_update(updateCourseInput: $payload) {
    ${CourseDetailData}
  }
}
`;

export const GET_COURSE_DETAIL = gql`
query Course_getById($id: String!) {
  Course_getById(id: $id) {
    ${CourseDetailDataWithLesson}
  }
}
`;

export const TOGGLE_COURSE = gql`
mutation Course_toggle($payload: ToggleCourseInput!) {
  Course_toggle(toggleCourseInput: $payload) {
    ${CourseDetailData}
  }
}
`;
