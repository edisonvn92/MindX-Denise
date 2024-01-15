import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { CoreInput, CoreUploadImageInput } from '@/components';
import { useAppContext } from '@/core';
import { Typography } from '@/mx';
import { contentMaxLength } from '@/domains/lesson/entities';
import './index.scss';

interface LessonFormProps {
  selectedPage: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  methodForm: UseFormReturn<any>;
  inExpandedDialog: boolean;
}

export const LessonCoverInputs: React.FC<LessonFormProps> = (props: LessonFormProps) => {
  const { selectedPage, methodForm, inExpandedDialog } = props;
  const { t } = useAppContext();
  const { control, setValue, getValues } = methodForm;

  return (
    <>
      <div className="bg-mx-white border border-solid border-mx-gray-200 rounded-xl p-4 mb-4">
        <div className="mb-4">
          <Typography fontTypo="body-l-desktop" weight="semibold" content={t('lesson:header')} />
        </div>
        <CoreUploadImageInput
          className="w-full mb-4"
          control={control}
          name={`pages.${selectedPage}.coverParam.logo`}
          setImageUrl={(url: string) => {
            setValue(`pages.${selectedPage}.coverParam.logo`, url);
          }}
          imageUrl={getValues(`pages.${selectedPage}.coverParam.logo`)}
          label={`${t('lesson:lessonLogo')} (1:1)`}
        />
        <CoreInput
          control={control}
          name={`pages.${selectedPage}.coverParam.lessonNumber`}
          placeholder={t('lesson:lessonNumber')}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(e: any) => {
            if (e.target && selectedPage === 0)
              setValue(
                `pages.${selectedPage}.coverParam.lessonNumber`,
                // eslint-disable-next-line no-restricted-globals
                isNaN(e.target.value) ? 0 : Number(e.target.value),
              );
          }}
          className="mb-4"
        />
        <CoreInput
          control={control}
          name={`pages.${selectedPage}.coverParam.lessonName`}
          placeholder={t('lesson:lessonName')}
          className="mb-4"
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(e: any) => {
            if (e.target && selectedPage === 0) setValue(`lesson.name`, e.target.value);
          }}
          maxLength={contentMaxLength.lessonTitle}
        />
        <CoreInput
          control={control}
          name={`pages.${selectedPage}.coverParam.learnTime`}
          placeholder={`${t('lesson:learningTime')} (${t('common:minute')})`}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(e: any) => {
            if (e.target && selectedPage === 0) {
              setValue(
                `pages.${selectedPage}.coverParam.learnTime`,
                // eslint-disable-next-line no-restricted-globals
                isNaN(e.target.value) ? 0 : Number(e.target.value),
              );
              setValue(
                `lesson.learnTime`,
                // eslint-disable-next-line no-restricted-globals
                isNaN(e.target.value) ? 0 : Number(e.target.value),
              );
            }
          }}
        />
      </div>
      <div
        className={`bg-mx-white border border-solid border-mx-gray-200 rounded-xl p-4 ${
          inExpandedDialog ? '' : 'last-form-div'
        } `}
      >
        <div className="mb-4">
          <Typography
            fontTypo="body-l-desktop"
            weight="semibold"
            content={t('lesson:coverImage')}
          />
        </div>
        <CoreUploadImageInput
          className="w-full"
          control={control}
          name={`pages.${selectedPage}.coverParam.coverImage`}
          setImageUrl={(url: string) => {
            setValue(`pages.${selectedPage}.coverParam.coverImage`, url);
          }}
          imageUrl={getValues(`pages.${selectedPage}.coverParam.coverImage`)}
          label={`${t('lesson:cover')} (16:9)`}
        />
      </div>
    </>
  );
};
