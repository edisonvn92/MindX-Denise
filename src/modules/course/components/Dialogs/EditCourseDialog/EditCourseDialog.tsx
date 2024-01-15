import React from 'react';
import useViewModel from '../../../viewmodels/course-form.viewmodel';
import { Button, Typography } from '@/mx';
import { CourseEntity } from '@/domains/course/entities';
import { useAppContext, useCoreContext } from '@/core';
import { CoreDesignDialog, CoreInput, CoreUploadImageInput } from '@/components';
import './index.scss';

interface DetailProps {
  detail?: CourseEntity;
  onSubmitSuccessfully(): void;
}

export const EditCourseDialog: React.FC<DetailProps> = (props: DetailProps) => {
  const { t } = useAppContext();
  const { detail, onSubmitSuccessfully } = props;
  const { methodForm, onSubmit, defaultValue } = useViewModel({ detail });
  const { isEditCourseDialogOpened, setIsEditCourseDialogOpened } = useCoreContext();
  const { control, reset, setValue, getValues } = methodForm;

  const onClickCancel = () => {
    reset({
      ...defaultValue,
    });
    setIsEditCourseDialogOpened(false);
  };

  return (
    <CoreDesignDialog
      open={isEditCourseDialogOpened}
      onClose={() => setIsEditCourseDialogOpened(false)}
      closeIcon={null}
      className="edit-dialog"
      maskClosable={false}
      title={
        <Typography
          fontTypo="heading-m-desktop"
          weight="semibold"
          content={detail ? t('course:editCourse') : t('course:addCourse')}
        />
      }
      footer={
        <div className="grid grid-cols-2 gap-2 pt-1">
          <Button
            type="outlined-primary"
            size="large"
            content={
              <Typography
                content={t('common:cancel')}
                fontTypo="body-xl-desktop"
                weight="semibold"
              />
            }
            onClick={onClickCancel}
          />
          <Button
            type="filled-primary"
            size="large"
            content={
              <Typography
                content={detail ? t('common:save') : t('course:addCourse')}
                fontTypo="body-xl-desktop"
                weight="semibold"
              />
            }
            htmlType="submit"
            onClick={async () => {
              await onSubmit(getValues() as any);
              await onSubmitSuccessfully();
            }}
          />
        </div>
      }
      body={
        <form>
          <div className="border border-solid border-mx-gray-200 rounded-xl p-4 my-4">
            <CoreUploadImageInput
              control={control}
              name="thumbnail"
              imageUrl={getValues('thumbnail')}
              setImageUrl={(url) => setValue('thumbnail', url)}
              label={t('course:courseThumbnail')}
              className="mb-4"
            />
            <div className="mb-3">
              <Typography
                fontTypo="body-xs-desktop"
                content={t('course:courseThumbnailRecommendation')}
              />
            </div>

            <CoreInput
              control={control}
              name="name"
              className="w-full mb-4"
              sizeProps="large"
              placeholder={t('course:courseName')}
            />
            <CoreInput
              control={control}
              name="code"
              className="w-full"
              sizeProps="large"
              placeholder={t('course:courseCode')}
            />
          </div>
        </form>
      }
    />
  );
};
