import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import './index.scss';
import { LessonItem } from './LessonItem';
import { CourseEntity, CourseLesson } from '@/domains/course/entities';

interface LessonListProps {
  methodForm: UseFormReturn<CourseEntity>;
  lessonList: CourseLesson[];
}

export const LessonList: React.FC<LessonListProps> = (props: LessonListProps) => {
  const { lessonList, methodForm } = props;

  return (
    <div>
      {methodForm
        ? lessonList.map((lesson: CourseLesson, index: number) => {
            return (
              <LessonItem lesson={lesson} methodForm={methodForm} index={index} key={lesson.id} />
            );
          })
        : undefined}
    </div>
  );
};
