import { gql } from '@apollo/client';
import { LessonData } from './lesson-data';

export const CREATE_LESSON = gql`
  mutation Lesson_create($payload: CreateLessonWthPageInput!) {
    Lesson_create(createLessonInput: $payload) {
      id
      name
    }
  }
`;

export const UPDATE_LESSON = gql`
  mutation Lesson_update($payload: UpdateLessonWthPageInput!) {
    Lesson_update(updateLessonInput: $payload) {
      id
      name
    }
  }
`;

export const GET_LESSON_DETAIL = gql`
  query Lesson_findOne($id: String!) {
    Lesson_findOne(id: $id) {
      ${LessonData}
    }
  }
`;

export const TOGGLE_LESSON = gql`
  mutation Lesson_toggle($payload: ToggleLessonInput!) {
    Lesson_toggle(toggleLessonInput: $payload) {
      id
      name
      isActive
    }
  }
`;

export const DELETE_LESSON = gql`
  mutation Lesson_delete($id: String!) {
    Lesson_delete(id: $id) {
      id
      name
    }
  }
`;
