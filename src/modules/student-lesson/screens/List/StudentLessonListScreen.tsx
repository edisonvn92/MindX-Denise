import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mx/ui';
import { StudentLessonList } from '../../components';
import { useCoreContext } from '@/core';
import { Loading, GetIcon } from '@/components';

export const StudentLessonListScreen: React.FC = () => {
  const { studentLesson, courseDetail, loading } = useCoreContext();
  const navigate = useNavigate();

  const goBackToList = () => {
    navigate('/student-courses');
  };

  return (
    <div className="w-full">
      <div className="mb-24 flex">
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
          weight="bold"
          content={`${courseDetail?.name || 'Course name'} -  ${
            courseDetail?.code || 'Course code'
          }`}
        />
      </div>
      <div className="w-full flex mb-10 justify-end" />
      {loading && (
        <div className="text-center">
          <Loading sizeProps="large" />
        </div>
      )}
      {!loading && studentLesson && (
        <div className="mt-8 p-4 mb-10 light03 rounded-lg w-2/3 border border-solid border-mx-gray-200">
          <StudentLessonList studentLessonList={studentLesson} />
        </div>
      )}
    </div>
  );
};
