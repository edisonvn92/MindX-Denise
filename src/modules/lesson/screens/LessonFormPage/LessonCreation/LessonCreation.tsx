import React from 'react';
import { useParams } from 'react-router-dom';
import { LessonForm } from './LessonForm';
import { useCoreContext } from '@/core';
import { Loading } from '@/components';

export const LessonCreationScreen: React.FC = () => {
  const params = useParams();
  const { lessonDetail, loading } = useCoreContext();

  return (
    <div className="w-full">
      {loading && (
        <div className="text-center">
          <Loading sizeProps="large" />
        </div>
      )}

      {(!params.id || lessonDetail) && <LessonForm detail={params.id ? lessonDetail : undefined} />}
    </div>
  );
};
