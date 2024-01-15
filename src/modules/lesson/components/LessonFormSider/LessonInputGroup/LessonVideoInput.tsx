import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { CoreInput, GetIcon } from '@/components';
import { useAppContext } from '@/core';
import { Typography } from '@/mx';
import { contentMaxLength } from '@/domains/lesson/entities';

interface LessonFormProps {
  selectedPage: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  methodForm: UseFormReturn<any>;
  inExpandedDialog: boolean;
}

export const LessonVideoInputs: React.FC<LessonFormProps> = (props: LessonFormProps) => {
  const { selectedPage, methodForm, inExpandedDialog } = props;
  const { t } = useAppContext();
  const { control, setValue } = methodForm;

  return (
    <>
      <div className="bg-mx-white border border-solid border-mx-gray-200 rounded-xl p-4 mb-4">
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
          <Typography fontTypo="body-l-desktop" weight="semibold" content={t('lesson:video')} />
        </div>

        <CoreInput
          control={control}
          name={`pages.${selectedPage}.videoParam.video`}
          placeholder={t('lesson:youtubeLink')}
          leftIcon
          leftIconSwap={<GetIcon icon="IoLinkOutline" className="w-6 h-6 ml--2" />}
        />
      </div>
    </>
  );
};
