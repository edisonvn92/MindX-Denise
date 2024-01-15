import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { PageShowcase } from './PageShowcase/PageShowcase';
import { LessonPage } from '@/domains/lesson/entities';

interface LessonContentProps {
  selectedPage: number;
  setSelectedPage: React.Dispatch<React.SetStateAction<number>>;
  pageFields: LessonPage[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  methodForm: UseFormReturn<any>;
}
export const ContentDiv: React.FC<LessonContentProps> = (props: LessonContentProps) => {
  const { selectedPage, setSelectedPage, pageFields, methodForm } = props;

  return (
    <div className="bg-mx-gray-50 border-mx-gray-200 grow rounded-xl border border-solid light05 m-4 h-full flex flex-nowrap min-h-[300px] overflow-y-auto">
      <PageShowcase
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
        pageFields={pageFields}
        methodForm={methodForm}
      />
    </div>
  );
};
