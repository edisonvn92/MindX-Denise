import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { CoreInput, CoreSwitch, CoreUploadImageInput } from '@/components';
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

export const LessonPicAndTextInputs: React.FC<LessonFormProps> = (props: LessonFormProps) => {
  const { selectedPage, methodForm, inExpandedDialog } = props;
  const { t } = useAppContext();
  const { control, setValue, getValues, watch } = methodForm;
  const hasImage = watch(`pages.${selectedPage}.pictureAndTextParam.hasIntroductionPicture`);

  return (
    <div className={`${inExpandedDialog ? 'grid grid-cols-2 gap-4' : ''}`}>
      <div className="bg-mx-white border border-solid border-mx-gray-200 rounded-xl p-4 mb-4 h-fit">
        <div className="mb-4">
          <Typography fontTypo="body-l-desktop" weight="semibold" content={t('lesson:header')} />
        </div>
        <CoreInput
          control={control}
          name={`pages.${selectedPage}.pageNumber`}
          placeholder={t('lesson:sectionNumber')}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(e: any) => {
            if (e.target)
              setValue(
                `pages.${selectedPage}.pageNumber`,
                // eslint-disable-next-line no-restricted-globals
                isNaN(e.target.value) ? 0 : Number(e.target.value),
              );
          }}
          className="mb-4"
        />

        <CoreInput
          control={control}
          name={`pages.${selectedPage}.pageName`}
          placeholder={t('lesson:sectionName')}
          maxLength={contentMaxLength.sessionTitle}
        />
      </div>
      <div
        className={`bg-mx-white border border-solid border-mx-gray-200 rounded-xl p-4 ${
          inExpandedDialog ? '' : 'last-form-div'
        }`}
      >
        <div className="mb-4">
          <Typography fontTypo="body-l-desktop" weight="semibold" content={t('lesson:content')} />
        </div>

        <div className="mb-4 flex">
          <CoreSwitch
            control={control}
            name={`pages.${selectedPage}.pictureAndTextParam.hasIntroductionPicture`}
            className="mr-2"
          />
          <Typography fontTypo="body-l-desktop" content={t('lesson:illustrationImage')} />
        </div>
        {hasImage ? (
          <CoreUploadImageInput
            className="w-full mb-4"
            control={control}
            name={`pages.${selectedPage}.pictureAndTextParam.introductionPicture`}
            setImageUrl={(url: string) => {
              setValue(`pages.${selectedPage}.pictureAndTextParam.introductionPicture`, url);
            }}
            imageUrl={getValues(`pages.${selectedPage}.pictureAndTextParam.introductionPicture`)}
            label={`${t('lesson:illustrationImage')} (1:1)`}
          />
        ) : undefined}

        <CoreInput
          control={control}
          name={`pages.${selectedPage}.pictureAndTextParam.content`}
          placeholder={t('lesson:content')}
          onChange={(value: string) =>
            setValue(`pages.${selectedPage}.pictureAndTextParam.content`, value, {
              shouldDirty: true,
            })
          }
          type="editor"
          maxLength={contentMaxLength.textContent}
        />
      </div>
    </div>
  );
};
