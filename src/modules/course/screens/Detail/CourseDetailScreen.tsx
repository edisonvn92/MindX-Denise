import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DeleteLessonDialog, EditCourseDialog, LessonList } from '../../components';
import { Loading, CoreSwitch, GetIcon } from '@/components';
import { useAppContext, useCoreContext } from '@/core';
import { CourseLesson } from '@/domains/course/entities';
import { Button, Typography } from '@/mx';

export const CourseDetailScreen: React.FC = () => {
  const { t } = useAppContext();
  const {
    courseId,
    courseDetail,
    actionGetCourseDetail,
    actionToggleCourse,
    methodForm,
    loading,
    setIsEditCourseDialogOpened,
    setIsDeleteLessonDialogOpened,
    selectedLessonId,
    actionDeleteLesson,
  } = useCoreContext();
  const navigate = useNavigate();
  const goBackToList = () => {
    navigate('/courses');
  };

  const onClickCreateLesson = () => {
    navigate(
      `/lesson/create?courseId=${courseId}&displayOrder=${
        (courseDetail.lessons as CourseLesson[]).length + 1
      }`,
    );
  };

  const onDeleteLesson = async () => {
    setIsDeleteLessonDialogOpened(false);
    await actionDeleteLesson(selectedLessonId);
    await actionGetCourseDetail(courseId);
  };

  const { control } = methodForm;
  return (
    <div className="w-full">
      {loading && (
        <div className="text-center">
          <Loading sizeProps="large" />
        </div>
      )}

      {!loading && courseDetail && (
        <>
          <div className="mb-16 flex justify-between">
            <div className="flex items-center">
              <Button
                leftIcon={<GetIcon icon="IoChevronBackOutline" className="h-6 w-6" />}
                type="filled-secondary"
                iconOnly
                size="large"
                className=" mr-2 p-3"
                onClick={goBackToList}
              />

              <Typography
                fontTypo="heading-l-desktop"
                weight="semibold"
                content={`${courseDetail.name} - ${courseDetail.code}`}
              />
              <Button
                leftIcon={<GetIcon icon="IoCreateOutline" className="h-6 w-6 mb-0.5" />}
                type="filled-secondary"
                iconOnly
                size="large"
                className="ml-2 p-3"
                onClick={() => setIsEditCourseDialogOpened(true)}
              />
            </div>

            <div className="flex items-center">
              <CoreSwitch
                control={control}
                name="isActive"
                onChange={(e) => {
                  actionToggleCourse({ id: courseId, isActive: e });
                }}
              />
              <div className="ml-3">
                <Typography content={t('common:show')} fontTypo="body-m-desktop" />
              </div>
            </div>
          </div>
          <div className="mt-8 p-4 mb-10 light03 rounded-lg w-2/3 border border-solid border-mx-gray-200">
            <div className="w-full flex mb-3 justify-end">
              <Button
                type="filled-secondary"
                size="large"
                leftIcon={<GetIcon icon="IoAddCircleOutline" className="h-6 w-6 mb-0.5" />}
                content={
                  <Typography
                    fontTypo="body-xl-desktop"
                    weight="semibold"
                    content={t('course:addLesson')}
                  />
                }
                onClick={onClickCreateLesson}
              />
            </div>
            <LessonList lessonList={courseDetail.lessons || []} methodForm={methodForm} />
          </div>
          <EditCourseDialog
            detail={courseDetail}
            onSubmitSuccessfully={() => actionGetCourseDetail(courseId)}
          />
          <DeleteLessonDialog onDelete={onDeleteLesson} />
        </>
      )}
    </div>
  );
};
