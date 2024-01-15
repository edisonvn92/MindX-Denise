export const StudentLessonData = `
    course {
        id
        name
        code
    }
    lessons {
        id
        lessonId
        studentId
        displayOrder
        status
        lesson {
            id
            name
            learnTime
        }
    }
`;

export const StudentLessonPageData = `
    pageId
    pageNumber
    pageName
    type
    status
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
        ... on QuizResponse {
            hasIntroductionImage
            introductionImage
            name
            quizContent
            hasExplain
            explain
            answers {
                content
                isCorrect
                isChosen
            }
        }
    }
`;

export const StudentLessonDetailData = `
  id
  lessonId
  courseId
  courseName
  studentId
  displayOrder
  nextStudentLessonId
  nextLesson {
    id
    name
    learnTime
  }
  status
  learningProgresses {
      ${StudentLessonPageData}
  }
`;

export const ScratchState = `
  id
  studentId
  lessonId
  courseId
  scratchState
`;
