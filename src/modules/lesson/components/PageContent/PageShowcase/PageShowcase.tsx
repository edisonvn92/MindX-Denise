import React, { useRef, useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { PageContent } from '../PageContent/PageContent';
import { LessonPage, PageType } from '@/domains/lesson/entities';
import { useAppContext } from '@/core';
import './index.scss';
import { ContentSizeEnum } from '@/core/context/AppContext';
import { useResponsive } from '@/core/hooks/useResponsive';
import { CoreCarousel } from '@/components/Carousel/Carousel';

interface LessonContentProps {
  selectedPage: number;
  setSelectedPage: React.Dispatch<React.SetStateAction<number>>;
  pageFields: LessonPage[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  methodForm?: UseFormReturn<any>;
  inEditMode?: boolean;
}
export const PageShowcase: React.FC<LessonContentProps> = (props: LessonContentProps) => {
  const { selectedPage, setSelectedPage, pageFields, methodForm, inEditMode = true } = props;
  const contentSize = inEditMode ? ContentSizeEnum.Large : ContentSizeEnum.ExtraLarge;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const slider: any = useRef(null);
  const { t, currentUser } = useAppContext();
  const [disableNext, setDisableNext] = useState<boolean>(false);
  const { topPaddingWrapperMatches } = useResponsive();
  useEffect(() => {
    if (slider.current) slider.current.goTo(selectedPage);
    if (!inEditMode && pageFields[selectedPage].type === PageType.Quiz) setDisableNext(true);
  }, [selectedPage]);

  return (
    <div
      className={`rounded-xl bg-mx-white light05 grow flex flex-col relative overflow-hidden ${topPaddingWrapperMatches(
        contentSize,
      )}`}
    >
      <CoreCarousel
        contentSize={contentSize}
        currentSlide={selectedPage}
        onCurrentChange={setSelectedPage}
        slides={pageFields.map((page: LessonPage, index: number) => {
          return (
            <PageContent
              control={methodForm?.control || undefined}
              index={index}
              pageParams={pageFields}
              contentSize={contentSize}
              key={index}
              allowAnswerQuiz={!inEditMode}
              setDisableNext={setDisableNext}
              currentUser={currentUser}
              isDragged={false}
            />
          );
        })}
      />
    </div>
  );
};
