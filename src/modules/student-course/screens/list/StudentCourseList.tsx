import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mx/ui';
import { useAppContext, useCoreContext } from '@/core';
import { StudentCourseEntity } from '@/domains/student-course/entities';
import { Loading } from '@/components';

export const StudentCourseListScreen: React.FC = () => {
  const { t } = useAppContext();
  const { studentCourseList, loading } = useCoreContext();
  const navigate = useNavigate();

  const navigateToId = (id: string) => {
    navigate(`/student-courses/${id}`);
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
      {loading && (
        <div className="text-center">
          <Loading sizeProps="large" />
        </div>
      )}
      {!loading && studentCourseList && (
        <div className="w-full grid grid-cols-4 gap-4">
          {studentCourseList.map((course: StudentCourseEntity) => {
            return (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
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
    </div>
  );
};
