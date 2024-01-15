import React, { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import {
  CoreInput,
  CoreSwitch,
  CoreSelect,
  CoreUploadImageInput,
  DeleteDialog,
  GetIcon,
} from '@/components';
import { useAppContext } from '@/core';
import { Button, Typography } from '@/mx';
import { AnswerContent, contentMaxLength } from '@/domains/lesson/entities';
import './index.scss';

interface LessonFormProps {
  selectedPage: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  methodForm: UseFormReturn<any>;
  inExpandedDialog: boolean;
}

export const LessonQuizInputs: React.FC<LessonFormProps> = (props: LessonFormProps) => {
  const { selectedPage, methodForm, inExpandedDialog } = props;
  const { t } = useAppContext();
  const { control, setValue, getValues, watch } = methodForm;
  const hasImage = watch(`pages.${selectedPage}.quizParam.hasIntroductionImage`);
  const answerFields = getValues(`pages.${selectedPage}.quizParam.answers`) as AnswerContent[];
  const [isDeleteAnswerDialogOpened, setIsDeleteAnswerDialogOpened] = useState<boolean>(false);
  const [selectedAnswerId, setSelectedAnswerId] = useState<number | undefined>(undefined);
  const correctAnswerOptions = answerFields.map((field, index) => {
    return {
      value: String(index),
      label: `${t('lesson:answer')} ${index + 1}`,
    };
  });

  const hasExplain = watch(`pages.${selectedPage}.quizParam.hasExplain`);
  const openDeleteAnswerDialog = (index: number) => {
    setIsDeleteAnswerDialogOpened(true);
    setSelectedAnswerId(index);
  };

  const onDeleteAnswer = () => {
    const currentAnswerFields = [...answerFields];
    currentAnswerFields.splice(selectedAnswerId!, 1);
    setValue(`pages.${selectedPage}.quizParam.answers`, currentAnswerFields);

    const correctedAnswer = currentAnswerFields.findIndex((answer) => answer.isCorrect === true);
    setValue(
      `pages.${selectedPage}.quizParam.correctAnswer`,
      correctedAnswer >= 0 ? correctedAnswer : undefined,
    );
    setIsDeleteAnswerDialogOpened(false);
  };

  const onAddAnswer = () => {
    const currentAnswerFields = [...answerFields];
    currentAnswerFields.push({
      content: '',
      isCorrect: false,
    });
    setValue(`pages.${selectedPage}.quizParam.answers`, currentAnswerFields);
  };

  const onChangeCorrectAnswer = (selectedIndex: string) => {
    answerFields.forEach((field, index) => {
      if (String(index) !== selectedIndex) {
        setValue(`pages.${selectedPage}.quizParam.answers.${index}.isCorrect`, false);
      } else setValue(`pages.${selectedPage}.quizParam.answers.${index}.isCorrect`, true);
    });
    setValue(`pages.${selectedPage}.quizParam.correctAnswer`, selectedIndex);
  };

  useEffect(() => {
    const correctedAnswer = answerFields.findIndex((answer) => answer.isCorrect === true);
    setValue(
      `pages.${selectedPage}.quizParam.correctAnswer`,
      correctedAnswer >= 0 ? correctedAnswer : undefined,
    );
  }, [selectedPage]);

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
        className={
          inExpandedDialog
            ? 'grid grid-cols-3 gap-4'
            : 'bg-mx-white border border-solid border-mx-gray-200 rounded-xl p-4 last-form-div'
        }
      >
        <div
          className={
            inExpandedDialog
              ? 'bg-mx-white border border-solid border-mx-gray-200 rounded-xl p-4 h-fit'
              : ''
          }
        >
          <div className="mb-4">
            <Typography
              fontTypo="body-l-desktop"
              weight="semibold"
              content={t('lesson:question')}
            />
          </div>
          <div className="mb-4 flex">
            <CoreSwitch
              control={control}
              name={`pages.${selectedPage}.quizParam.hasIntroductionImage`}
              className="mr-2"
            />
            <Typography fontTypo="body-l-desktop" content={t('lesson:illustrationImage')} />
          </div>

          {hasImage ? (
            <CoreUploadImageInput
              className="w-full mb-4"
              control={control}
              name={`pages.${selectedPage}.quizParam.introductionImage`}
              setImageUrl={(url: string) => {
                setValue(`pages.${selectedPage}.quizParam.introductionImage`, url);
              }}
              imageUrl={getValues(`pages.${selectedPage}.quizParam.introductionImage`)}
              label={`${t('lesson:illustrationImage')} (1:1)`}
            />
          ) : undefined}

          <CoreInput
            className="mb-4"
            control={control}
            name={`pages.${selectedPage}.quizParam.quizContent`}
            placeholder={t('lesson:question')}
            type="editor"
            maxLength={contentMaxLength.quizQuestion}
          />
        </div>
        <div
          className={
            inExpandedDialog
              ? 'bg-mx-white border border-solid border-mx-gray-200 rounded-xl p-4 h-fit'
              : ''
          }
        >
          <div className="mb-4">
            <Typography fontTypo="body-l-desktop" weight="semibold" content={t('lesson:answer')} />
          </div>
          {answerFields
            ? answerFields.map((field, index) => {
                return (
                  <CoreInput
                    key={index}
                    className="mb-4"
                    control={control}
                    name={`pages.${selectedPage}.quizParam.answers.${index}.content`}
                    placeholder={`${t('lesson:answer')} ${index + 1}`}
                    rightIcon
                    rightIconSwap={
                      /* eslint-disable */
                      answerFields.length > 2 ? (
                        <div
                          className="cursor-pointer"
                          onClick={() => openDeleteAnswerDialog(index)}
                        >
                          <GetIcon icon="IoTrashOutline" className="text-mx-red-600 w-5 h-5" />
                        </div>
                      ) : (
                        <></>
                      )
                    }
                    maxLength={contentMaxLength.quizAnswer}
                  />
                );
              })
            : undefined}
          <Button
            type="filled-primary"
            size="medium"
            content={
              <Typography
                content={t('lesson:addAnswer')}
                fontTypo="body-l-desktop"
                weight="semibold"
              />
            }
            className="mb-4 w-full"
            onClick={onAddAnswer}
            disabled={answerFields.length >= 4}
          />
          <div className="mb-3">
            <CoreSelect
              optionProps={correctAnswerOptions}
              control={control}
              name={`pages.${selectedPage}.quizParam.correctAnswer`}
              value={watch(`pages.${selectedPage}.quizParam.correctAnswer`)}
              onChange={onChangeCorrectAnswer}
              placeholder={t('lesson:correctAnswer')}
              required
              sizeProps="large"
            />
          </div>
        </div>

        <div
          className={
            inExpandedDialog
              ? 'bg-mx-white border border-solid border-mx-gray-200 rounded-xl p-4 h-fit'
              : ''
          }
        >
          <div className="mb-4">
            <Typography
              fontTypo="body-l-desktop"
              weight="semibold"
              content={t('lesson:explanation')}
            />
          </div>
          <div className="flex">
            <CoreSwitch
              control={control}
              name={`pages.${selectedPage}.quizParam.hasExplain`}
              className="mr-2"
            />
            <Typography fontTypo="body-l-desktop" content={t('lesson:explainAnswer')} />
          </div>
          {hasExplain ? (
            <CoreInput
              control={control}
              name={`pages.${selectedPage}.quizParam.explain`}
              placeholder={t('lesson:explanation')}
              className="mt-4"
            />
          ) : undefined}
        </div>
      </div>
      <DeleteDialog
        title={t('lesson:doYouWantToDeleteAnswer', { answerNumber: selectedAnswerId! + 1 })}
        body={t('common:thisActionIsIrreversible')}
        isOpened={isDeleteAnswerDialogOpened}
        onDelete={onDeleteAnswer}
        onClose={() => setIsDeleteAnswerDialogOpened(false)}
        className="delete-dialog"
      />
    </>
  );
};
