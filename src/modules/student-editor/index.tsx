import React from 'react';
import { config } from '@/config';
import { Authorize } from '@/core';
import { PERMISSIONS } from '@/core/constants/permission.constant';

export const StudentEditorWithoutAuthor: React.FC = () => {
  return (
    <div className="flex w-full h-full py-4 bg-mx-gray-50">
      <iframe
        title="Scratch"
        src={`${config.scratchEditorUrl}`}
        frameBorder="0"
        className="rounded-xl border border-solid border-mx-gray-200 bg-mx-white mx-4 light05 aspect-video grow relative"
      />
    </div>
  );
};

export const StudentEditor = Authorize<unknown>(
  StudentEditorWithoutAuthor,
  PERMISSIONS.STUDENT_EDITOR.VIEW,
);
