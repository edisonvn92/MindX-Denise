export const CourseGeneralData = `
  id
  name
  code
  thumbnail
`;

export const CourseDetailData = `
  ${CourseGeneralData}
  isActive
`;
export const CourseDetailDataWithLesson = `
  ${CourseDetailData}
  lessons {
    id
    name
    isActive
    displayOrder
    learnTime
  }
`;
