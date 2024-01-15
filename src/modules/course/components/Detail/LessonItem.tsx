import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { CoreSwitch, GetIcon } from '@/components';
import { CourseEntity, CourseLesson } from '@/domains/course/entities';
import { useAppContext, useCoreContext } from '@/core';
import { Button, Typography } from '@/mx';

interface LessonItemProps {
  methodForm: UseFormReturn<CourseEntity>;
  lesson: CourseLesson;
  index: number;
}
export const LessonItem: React.FC<LessonItemProps> = (props: LessonItemProps) => {
  const { t } = useAppContext();
  const { lesson, methodForm, index } = props;
  const {
    courseId,
    actionGetCourseDetail,
    actionToggleLesson,
    setIsDeleteLessonDialogOpened,
    setSelectedLessonId,
  } = useCoreContext();
  const [isHover, setIsHover] = useState<boolean>(false);
  const navigate = useNavigate();
  const { control } = methodForm;

  const onClickEditLesson = (id: string) => {
    navigate(`/lesson/edit/${id}`);
  };
  const onClickDeleteLesson = (id: string) => {
    setIsDeleteLessonDialogOpened(true);
    setSelectedLessonId(id);
  };

  return (
    <div
      className={`w-full flex rounded-lg p-4 ${isHover ? 'bg-mx-blue-100' : 'bg-mx-white'}`}
      style={{
        transition: '0.5s',
        wordBreak: 'break-word',
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="flex m-auto grow justify-start">
        <GetIcon icon="IoEllipse" className="text-mx-green-600 mr-2 mt-1 w-4 h-4" />
        <div>
          <Typography
            content={`${t('course:lessonNo', { lessonNo: lesson.displayOrder })} - ${lesson.name}`}
            fontTypo="body-l-desktop"
            weight="bold"
          />

          <Typography
            content={t('course:minutesStudy', { min: lesson.learnTime })}
            fontTypo="body-s-desktop"
            className="text-mx-gray-600"
          />
        </div>
      </div>
      <div
        className="w-200 flex items-center"
        style={{
          opacity: isHover ? 1 : 0,
          transition: 'all 0.5s',
        }}
      >
        <Button
          type="filled-primary"
          size="large"
          content={
            <Typography content={t('common:edit')} fontTypo="body-xl-desktop" weight="semibold" />
          }
          className="w-200 mt-1 border-none"
          onClick={() => onClickEditLesson(lesson.id)}
        />
      </div>
      <div className="flex ml-2 items-center">
        <CoreSwitch
          control={control}
          name={`lessons.${index}.isActive`}
          onChange={async (e) => {
            await actionToggleLesson({ id: lesson.id, isActive: e });
            await actionGetCourseDetail(courseId);
          }}
        />
        <Button
          leftIcon={<GetIcon icon="IoTrashOutline" className="w-4 h-4" />}
          type="outlined-danger"
          iconOnly
          size="small"
          className="px-[8px] py-2 mx-1 border-none"
          onClick={() => onClickDeleteLesson(lesson.id)}
        />

        <GetIcon icon="IoReorderThreeSharp" className="text-mx-gray-600 w-4 h-4 mt-0.5" />
      </div>

      <div />
    </div>
  );
};
