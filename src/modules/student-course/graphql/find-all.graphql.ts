import { gql } from '@apollo/client';
import { StudentCourseGeneralData } from './course-data';

export const GET_STUDENT_COURSE_LIST = gql`
query Course_getAllByStudent {
  Course_getAllByStudent {
      ${StudentCourseGeneralData}
  }
}
`;
