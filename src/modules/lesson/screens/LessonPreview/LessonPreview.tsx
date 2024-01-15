import React, { useState } from 'react';
import { PageShowcase } from '../../components/PageContent/PageShowcase/PageShowcase';
import { PERMISSIONS } from '@/core/constants/permission.constant';
import { Authorize } from '@/core';

export const LessonPreviewWithoutAuthor: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState<number>(0);
  const lessonData = JSON.parse(sessionStorage.getItem('previewLessonData') || '{}');
  return (
    <div className="flex w-full h-screen">
      <PageShowcase
        pageFields={lessonData.pages}
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
        inEditMode={false}
      />
    </div>
  );
};

export const LessonPreview = Authorize<unknown>(
  LessonPreviewWithoutAuthor,
  PERMISSIONS.LESSON.VIEW,
);
