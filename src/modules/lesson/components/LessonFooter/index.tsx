import React, { useRef } from 'react';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { LessonPage } from '@/domains/lesson/entities';
import { Button, Typography } from '@/mx';
import { GetIcon } from '@/components';
import './index.scss';

interface FooterProps {
  selectedPage: number;
  setSelectedPage: React.Dispatch<React.SetStateAction<number>>;
  pageFields: LessonPage[];
  addPage(): void;
  methodForm: UseFormReturn<any>;
}
export const LessonFooter: React.FC<FooterProps> = (props: FooterProps) => {
  const { selectedPage, setSelectedPage, pageFields, addPage, methodForm } = props;
  const { setValue, getValues, control } = methodForm;
  const formData = getValues('pages');
  const { move } = useFieldArray({
    control,
    name: 'pages',
  });
  const scrollEndRef = useRef(null);
  const addContentPage = () => {
    addPage();
    setSelectedPage(pageFields.length);
    (scrollEndRef.current as any).scrollIntoView({ behavior: 'smooth', inline: 'center' });
  };

  const handleReplaceDisplayOrder = (current: number, next: number) => {
    const tempOrder = formData[current].displayOrder;
    formData[current].displayOrder = formData[next].displayOrder;
    formData[next].displayOrder = tempOrder;

    setValue('pages', formData);
  };

  const moveToNextSlide = (): void => {
    if (selectedPage < pageFields.length - 1) {
      handleReplaceDisplayOrder(selectedPage, selectedPage + 1);
      setSelectedPage(() => selectedPage + 1);
      move(selectedPage, selectedPage + 1);
    }
  };

  const moveToPrevSlide = (): void => {
    if (selectedPage > 0) {
      handleReplaceDisplayOrder(selectedPage, selectedPage - 1);
      setSelectedPage(() => selectedPage - 1);
      move(selectedPage, selectedPage - 1);
    }
  };

  return (
    <div
      id="lessonFooter"
      className="bg-mx-white w-full overflow-x-auto flex flex-start flex-nowrap mb-3"
    >
      {pageFields.map((page: LessonPage, index: number) => {
        return (
          <div
            key={index}
            className={`frame-box h-156 aspect-video border border-solid cursor-pointer rounded-xl mx-2 p-3 ${
              index === selectedPage ? 'border-4 border-mx-brand-500' : `border-mx-gray-200`
            }`}
            onClick={() => setSelectedPage(index)}
          >
            {pageFields.length > 1 && index === selectedPage && (
              <div className="box-action">
                {selectedPage === 0 || (
                  <Button
                    type="filled-inverse"
                    size="large"
                    leftIcon={<GetIcon icon="IoChevronBackOutline" />}
                    className="border-none"
                    onClick={(e) => {
                      e.stopPropagation();
                      moveToPrevSlide();
                    }}
                  />
                )}
                {selectedPage === pageFields.length - 1 || (
                  <Button
                    type="filled-inverse"
                    size="large"
                    leftIcon={<GetIcon icon="IoChevronForwardOutline" />}
                    className="border-none"
                    onClick={(e) => {
                      e.stopPropagation();
                      moveToNextSlide();
                    }}
                  />
                )}
              </div>
            )}
            <Typography
              className="slide-number"
              fontTypo="body-m-desktop"
              content={`${index + 1}`}
              weight="bold"
            />
          </div>
        );
      })}
      <div className="my-auto h-8" ref={scrollEndRef}>
        <Button
          type="filled-primary"
          size="medium"
          iconOnly
          leftIcon={<GetIcon icon="IoAddOutline" className="w-6 h-6" />}
          className="border-none py-[12px]"
          onClick={addContentPage}
        />
      </div>
    </div>
  );
};
