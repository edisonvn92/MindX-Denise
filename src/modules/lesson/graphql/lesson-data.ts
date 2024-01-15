const PageData = `
  id
  pageNumber
  pageName
  type
  displayOrder
  content {
    ... on Cover {
      logo
      lessonName
      lessonNumber
      learnTime
      coverImage
    }
    ... on PictureAndText {
      introductionPicture
      hasIntroductionPicture
      content
    }
    ... on Video {
      video
    }
    ... on Quiz {
      hasIntroductionImage
      introductionImage
      quizContent
      hasExplain
      explain
      answers {
          content
          isCorrect
      }
    }
  }
`;
export const LessonData = `
  id
  name
  isActive
  courseId
  displayOrder
  totalPage
  pages {
    ${PageData}
  }
`;
