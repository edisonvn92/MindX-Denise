import React, { useCallback } from 'react';
import SearchInput from './SearchInput/SearchInput';
import ClearFilter from './ClearFilter/ClearFilter';
import SelectField from '@/components/Form/CoreSelect/SelectField/SelectField';
import { useAppContext, useCoreContext } from '@/core';
import { StudentCourseEntity } from '@/domains/student-course/entities';
import { UserLessonStatus } from '@/domains/realtime-dashboard/entities';
import CoreDesignDropDown from '@/components/DropDown';
import { GetIcon } from '@/components';

interface FilterContentProps {
  type: string;
}

const FilterContent = (props: FilterContentProps) => {
  const { type } = props;
  const { t } = useAppContext();
  const { courses, setFilter, filter } = useCoreContext();

  const optionSorting = [
    {
      label: `${t('common:studentName')}`,
      value: 'studentName',
    },
    {
      label: `${t('common:status')}`,
      value: 'status',
    },
  ];

  const optionFilterByStatus = useCallback(() => {
    return UserLessonStatus.map((status: string) => {
      return {
        label: `${t(`common:${status}`)}`,
        value: status,
      };
    });
  }, [filter]);

  const optionFilterByCourse = useCallback(() => {
    return courses?.map((course: StudentCourseEntity) => {
      return {
        label: course?.name,
        value: course?.id,
      };
    });
  }, [courses]);

  const handleOrderBy = (value: string) => {
    setFilter({ ...filter, orderBy: value ? value.trim() : 'studentName' });
  };

  return (
    <div className="flex justify-between items-center mt-4">
      <div className="flex ">
        <CoreDesignDropDown
          optionSorting={optionSorting}
          onChange={handleOrderBy}
          className="pr-4 border-list"
          placeholder={t('common:softingBy')}
          value={t(`common:${filter.orderBy}`)}
          leftIcon={
            <GetIcon icon="IoSwapVerticalOutline" className="w-5 h-5 items-center my-auto mr-2" />
          }
        />

        <SelectField
          optionProps={optionFilterByStatus()}
          onChange={(event: any) => {
            setFilter({ ...filter, status: event });
          }}
          sizeProps="small"
          placeholder={t('common:status')}
          className="mx-4"
          mode="tags"
          value={filter.status}
        />

        {type === 'mentor' && (
          <SelectField
            optionProps={optionFilterByCourse()}
            onChange={(event: any) => {
              setFilter({ ...filter, courseId: event });
            }}
            sizeProps="small"
            placeholder={t('common:course')}
            mode="tags"
            value={filter.courseId}
          />
        )}
      </div>
      <div className="flex">
        <ClearFilter />
        <SearchInput />
      </div>
    </div>
  );
};

export default FilterContent;
