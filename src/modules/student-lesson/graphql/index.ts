import { gql } from '@apollo/client';
import { ScratchState, StudentLessonData, StudentLessonDetailData } from './student-lesson.graph';

export const GET_STUDENT_LESSON_LIST = gql`
query StudentLesson_find($payload: FindStudentLesson!) {
  StudentLesson_find(findStudentLesson: $payload) {
      ${StudentLessonData}
  }
}
`;

export const GET_STUDENT_LESSON = gql`
query StudentLesson_findOne($id: String!) {
  StudentLesson_findOne(id: $id) {
      ${StudentLessonDetailData}
  }
}
`;

export const UPDATE_LEARNING_PROGRESS = gql`
  mutation StudentLesson_updateLearningProgress($payload: UpdateLearningProgressInput!) {
    StudentLesson_updateLearningProgress(updateLearningProgressInput: $payload) {
      id
    }
  }
`;

export const UPDATE_TAKE_QUIZ = gql`
  mutation StudentLesson_takeQuiz($payload: TakeQuizInput!) {
    StudentLesson_takeQuiz(takeQuizInput: $payload) {
      id
    }
  }
`;

export const GET_SCRATCH_STATE = gql`
query StudentLesson_getCurrentScratchState($id: String!) {
  StudentLesson_getCurrentScratchState(id: $id) {
      ${ScratchState}
  }
}
`;

export const UPDATE_SCRATCH_STATE = gql`
  mutation StudentLesson_updateScratchState($payload: UpdateScratchStateInput!) {
    StudentLesson_updateScratchState(updateScratchStateInput: $payload) {
      id
    }
  }
`;
