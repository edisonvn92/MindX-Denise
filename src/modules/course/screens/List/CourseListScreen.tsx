import React from 'react';
import { useNavigate } from 'react-router-dom';
import { EditCourseDialog } from '../../components/Dialogs/EditCourseDialog/EditCourseDialog';
import { CourseEntity } from '@/domains/course/entities';
import { useAppContext, useCoreContext } from '@/core';
import { Button, Typography } from '@/mx';
import { Loading, GetIcon } from '@/components';

export const CourseListScreen: React.FC = () => {
  const { t } = useAppContext();
  const { courseList, actionGetAllCourse, loading, setIsEditCourseDialogOpened } = useCoreContext();
  const navigate = useNavigate();

  const navigateToId = (id: string) => {
    navigate(`${id}`);
  };

  const onCreateCourseSuccessfully = () => {
    actionGetAllCourse();
  };
  return (
    <div className="w-full">
      <div className="mb-24">
        <Typography
          fontTypo="heading-l-desktop"
          weight="semibold"
          content={t('course:courseSummary')}
        />
      </div>
      <div className="w-full flex mb-10 justify-end">
        <Button
          type="filled-secondary"
          size="large"
          leftIcon={<GetIcon icon="IoAddCircleOutline" className="h-6 w-6 mb-0.5" />}
          content={
            <Typography
              fontTypo="body-xl-desktop"
              weight="semibold"
              content={t('course:addCourse')}
            />
          }
          onClick={() => setIsEditCourseDialogOpened(true)}
        />
      </div>
      {loading && (
        <div className="text-center">
          <Loading sizeProps="large" />
        </div>
      )}
      {!loading && courseList && (
        <div className="w-full grid grid-cols-4 gap-4">
          {courseList.map((course: CourseEntity) => {
            return (
              <div
                key={course.id}
                className="cursor-pointer"
                onClick={() => navigateToId(course.id)}
              >
                <img
                  src={course.thumbnail}
                  className=" w-full aspect-video object-cover mb-3 rounded-lg"
                  alt={course.name}
                />
                <div className="mb-1">
                  <Typography fontTypo="heading-s-desktop" weight="bold" content={course.name} />
                </div>
                <Typography
                  fontTypo="heading-s-desktop"
                  content={course.code}
                  className="text-mx-gray-600"
                />
              </div>
            );
          })}
        </div>
      )}

      <EditCourseDialog onSubmitSuccessfully={onCreateCourseSuccessfully} />
    </div>
  );
};
