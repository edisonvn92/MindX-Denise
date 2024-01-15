import { gql } from '@apollo/client';
import { MentorData } from './mentor-data';

export const GET_MENTOR_BY_USER_ID = gql`
  query Mentor_findByUserId($userId: String!) {
    Mentor_findByUserId(userId: $userId) {
      ${MentorData}
    }
  }
`;

export const GET_MENTOR_BY_ID = gql`
  query Mentor_findOne($id: String!) {
    Mentor_findOne(id: $id) {
      ${MentorData}
    }
  }
`;
