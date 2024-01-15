import React, { useState } from 'react';
import { ContentDiv, LessonFooter, LessonFormSider, LessonHeader } from '../../../components';
import useViewModel from '../../../viewmodels/lesson-form.viewmodel';
import { LessonEntity } from '@/domains/lesson/entities';

interface DetailProps {
  detail?: LessonEntity;
}

export const LessonForm: React.FC<DetailProps> = (props: DetailProps) => {
  const { detail } = props;
  const [selectedPage, setSelectedPage] = useState<number>(0);
  const { methodForm, pageFields, addPage, removePage, onSubmit, loading } = useViewModel({
    detail,
  });
  return (
    <div className="h-screen w-screen flex bg-mx-gray-50">
      <div className="bg-mx-white h-full flex flex-col grow min-w-[600px]">
        <LessonHeader />
        <ContentDiv
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
          pageFields={pageFields}
          methodForm={methodForm}
        />
        <LessonFooter
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
          pageFields={pageFields}
          addPage={addPage}
          methodForm={methodForm}
        />
      </div>

      <LessonFormSider
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
        methodForm={methodForm}
        onSubmit={onSubmit}
        removePage={removePage}
        loading={loading}
      />
    </div>
  );
};
