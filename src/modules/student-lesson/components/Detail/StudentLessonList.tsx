import React from 'react';
import './index.css';
import { StudentLessonItem } from './StudentLessonItem';
import { LessonStatus, StudentLessonEntity } from '@/domains/student-lesson/entities';

interface LessonListProps {
  studentLessonList: StudentLessonEntity[];
}

export const StudentLessonList: React.FC<LessonListProps> = (props: LessonListProps) => {
  const { studentLessonList } = props;
  const currentLessonIndex = studentLessonList.findIndex((lesson: StudentLessonEntity) => {
    return lesson.status === LessonStatus.Inprogress || lesson.status === LessonStatus.NotStarted;
  });
  return (
    <div className="flex flex-col gap-2">
      {studentLessonList.map((lesson: StudentLessonEntity, index: number) => {
        return (
          <StudentLessonItem
            lesson={lesson}
            key={lesson.id}
            isCurrentLesson={index === currentLessonIndex}
          />
        );
      })}
    </div>
  );
};
