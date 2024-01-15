import React from 'react';
import { useAppContext, useCoreContext } from '@/core';
import './index.scss';
import { DeleteDialog } from '@/components';

type DeleteDialogProps = {
  onDelete(): void;
};

export const DeleteLessonDialog: React.FC<DeleteDialogProps> = (props: DeleteDialogProps) => {
  const { onDelete } = props;
  const { t } = useAppContext();
  const { isDeleteLessonDialogOpened, setIsDeleteLessonDialogOpened } = useCoreContext();
  return (
    <DeleteDialog
      title={t('course:doYouWantToDeleteLesson')}
      body={t('common:thisActionIsIrreversible')}
      isOpened={isDeleteLessonDialogOpened}
      onDelete={onDelete}
      onClose={() => setIsDeleteLessonDialogOpened(false)}
    />
  );
};
