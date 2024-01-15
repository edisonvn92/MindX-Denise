import React, { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import {
  LessonCoverInputs,
  LessonPicAndTextInputs,
  LessonQuizInputs,
  LessonVideoInputs,
} from './LessonInputGroup';
import { useAppContext } from '@/core';
import './index.scss';
import { PageType } from '@/domains/lesson/entities';
import { CoreDesignDialog, CoreSelect, DeleteDialog, GetIcon } from '@/components';
import { Button, Typography } from '@/mx';

interface LessonFormProps {
  selectedPage: number;
  setSelectedPage: React.Dispatch<React.SetStateAction<number>>;
  methodForm: UseFormReturn<any>;
  onSubmit(e: any): void;
  removePage(index: number): void;
  loading: boolean;
}

export const LessonFormSider: React.FC<LessonFormProps> = (props: LessonFormProps) => {
  const { selectedPage, methodForm, onSubmit, setSelectedPage, removePage, loading } = props;
  const { control, setValue, getValues, watch } = methodForm;
  // const selectedType = useWatch({ control, name: `pages.${selectedPage}.type` });
  const [selectedType, setSelectedType] = useState<PageType>(PageType.Cover);
  const [isDeletePageDialogOpened, setIsDeletePageDialogOpened] = useState<boolean>(false);
  const [isExpandedFormDialogOpened, setIsExpandedFormDialogOpened] = useState<boolean>(false);
  const { t } = useAppContext();
  const pageTypeOptions = [
    {
      value: PageType.Cover,
      label: t('lesson:cover'),
    },
    {
      value: PageType.PictureAndText,
      label: t('lesson:pictureAndText'),
    },
    {
      value: PageType.Video,
      label: t('lesson:video'),
    },
    {
      value: PageType.Quiz,
      label: t('lesson:quiz'),
    },
  ];

  const renderInput = (inExpandedDialog: boolean) => {
    switch (selectedType) {
      case PageType.PictureAndText:
        return (
          <LessonPicAndTextInputs
            selectedPage={selectedPage}
            methodForm={methodForm}
            inExpandedDialog={inExpandedDialog}
          />
        );
      case PageType.Video:
        return (
          <LessonVideoInputs
            selectedPage={selectedPage}
            methodForm={methodForm}
            inExpandedDialog={inExpandedDialog}
          />
        );
      case PageType.Quiz:
        return (
          <LessonQuizInputs
            selectedPage={selectedPage}
            methodForm={methodForm}
            inExpandedDialog={inExpandedDialog}
          />
        );
      default:
        return (
          <LessonCoverInputs
            selectedPage={selectedPage}
            methodForm={methodForm}
            inExpandedDialog={inExpandedDialog}
          />
        );
    }
  };

  const setExpandDialogClassName = () => {
    if (selectedType === PageType.PictureAndText || selectedType === PageType.Quiz)
      return 'large-expanded-dialog';
    return 'small-expanded-dialog';
  };

  const submitForm = () => {
    onSubmit(getValues());
  };

  const onClickPreview = () => {
    sessionStorage.setItem('previewLessonData', JSON.stringify(getValues()));
    window.open('/lesson/preview', '_blank');
  };

  const renderButtonGroup = () => {
    return (
      <>
        <Button
          type="filled-inverse"
          size="medium"
          content={
            <Typography content={t('lesson:preview')} fontTypo="body-l-desktop" weight="semibold" />
          }
          leftIcon={<GetIcon icon="IoPlayOutline" className="w-6 h-6 mr-2" />}
          className="border-none bg-mx-gray-50 flex justify-center"
          onClick={onClickPreview}
        />
        <Button
          type="filled-primary"
          size="medium"
          content={
            <Typography content={t('common:save')} fontTypo="body-l-desktop" weight="semibold" />
          }
          leftIcon={<GetIcon icon="IoSave" className="w-6 h-6 mr-2" />}
          className="grow border-none flex justify-center"
          onClick={submitForm}
          disabled={loading}
        />
      </>
    );
  };

  const onDeletePage = () => {
    setIsExpandedFormDialogOpened(false);
    removePage(selectedPage);
    setSelectedPage(selectedPage - 1);
    setIsDeletePageDialogOpened(false);
  };

  useEffect(() => {
    setSelectedType(getValues(`pages.${selectedPage}.type`));
    setValue(`pages.${selectedPage}`, watch(`pages.${selectedPage}`));
  }, [selectedPage]);

  return (
    <div id="lessonSidebar" className="bg-mx-gray-50 light03 ml-1 relative">
      <div className="bg-mx-gray-50 h-full p-4 pb-14 flex flex-col justify-between input-sider overflow-auto">
        <div>
          <div className="flex justify-between mb-4">
            <Typography
              fontTypo="body-xl-desktop"
              weight="bold"
              content={`Slide #${selectedPage + 1}`}
            />
            <div className="flex">
              <Button
                type="filled-inverse"
                size="small"
                iconOnly
                leftIcon={<GetIcon icon="IoResizeOutline" className=" w-5 h-5" />}
                onClick={() => setIsExpandedFormDialogOpened(true)}
                className="mr-2 px-[4px] py-[4px] border-none bg-mx-gray-50"
              />
              {selectedPage !== 0 ? (
                <Button
                  type="filled-inverse"
                  size="small"
                  iconOnly
                  leftIcon={<GetIcon icon="IoTrashOutline" className="text-mx-red-600 w-5 h-5" />}
                  onClick={() => setIsDeletePageDialogOpened(true)}
                  className="px-[4px] py-[4px] border-none bg-mx-gray-50 hover:bg-mx-red-50"
                />
              ) : undefined}
            </div>
          </div>

          <div className="mb-3">
            <CoreSelect
              optionProps={pageTypeOptions}
              control={control}
              name={`pages.${selectedPage}.type`}
              onChange={(e) => {
                setValue(`pages.${selectedPage}.type`, e);
                setSelectedType(e);
              }}
              label={t('lesson:pageType')}
              required
              value={selectedType}
              sizeProps="large"
            />
          </div>
          {renderInput(false)}
        </div>
        <div className="py-4 absolute bottom-0 bg-mx-gray-50 flex gap-2" style={{ width: '286px' }}>
          {renderButtonGroup()}
        </div>
      </div>

      <CoreDesignDialog
        className={`expanded-form-dialog ${setExpandDialogClassName()}`}
        open={isExpandedFormDialogOpened}
        onClose={() => setIsExpandedFormDialogOpened(false)}
        maskClosable={false}
        closeIcon={
          <div className="fixed top-5 right-4">
            <GetIcon icon="IoCloseOutline" className="w-6 h-6" />
          </div>
        }
        title={
          <div className="flex justify-between pr-8">
            <Typography
              fontTypo="body-xl-desktop"
              weight="bold"
              content={`Slide #${selectedPage + 1}`}
            />
            {selectedPage !== 0 ? (
              <Button
                type="filled-inverse"
                size="small"
                iconOnly
                leftIcon={<GetIcon icon="IoTrashOutline" className="text-mx-red-600 w-5 h-5" />}
                onClick={() => setIsDeletePageDialogOpened(true)}
                className="px-[4px] py-[4px] border-none bg-mx-gray-50 hover:bg-mx-red-50"
              />
            ) : undefined}
          </div>
        }
        footer={<div className="grid grid-cols-2 gap-2">{renderButtonGroup()}</div>}
        body={
          <div className="my-4">
            <div className="mb-3">
              <CoreSelect
                optionProps={pageTypeOptions}
                control={control}
                name={`pages.${selectedPage}.type`}
                onChange={(e) => {
                  setValue(`pages.${selectedPage}.type`, e);
                  setSelectedType(e);
                }}
                label={t('lesson:pageType')}
                required
                value={selectedType}
                sizeProps="large"
              />
            </div>
            {renderInput(true)}
          </div>
        }
      />
      <DeleteDialog
        title={t('lesson:doYouWantToDeletePage', { pageNumber: selectedPage + 1 })}
        body={t('common:thisActionIsIrreversible')}
        isOpened={isDeletePageDialogOpened}
        onDelete={onDeletePage}
        onClose={() => setIsDeletePageDialogOpened(false)}
        className="delete-dialog"
      />
    </div>
  );
};
