/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { StudentLessonProvider } from '../../context/StudentLessonProvider';
import { LessonLearnScreen } from './LessonLearnScreen';

export const StudentLessonLearn: React.FC = () => {
  return (
    <StudentLessonProvider>
      <LessonLearnScreen />
    </StudentLessonProvider>
  );
};
