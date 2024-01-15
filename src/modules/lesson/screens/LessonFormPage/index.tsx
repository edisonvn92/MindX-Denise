import React from 'react';
import { LessonProvider } from '../../context';
import { LessonCreationScreen } from './LessonCreation/LessonCreation';
import { Authorize } from '@/core';
import { PERMISSIONS } from '@/core/constants/permission.constant';

export const LessonFormPageWithoutAuthor: React.FC = () => {
  return (
    <LessonProvider>
      <div className="bg-mx-white flex flex-col flex-wrap">
        <div>
          <LessonCreationScreen />
        </div>
      </div>
    </LessonProvider>
  );
};

export const LessonFormPage = Authorize<unknown>(
  LessonFormPageWithoutAuthor,
  PERMISSIONS.LESSON.VIEW,
);
