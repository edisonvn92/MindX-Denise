import React from 'react';
import FilterContent from './FilterContent/FilterContent';
import TableContent from './StudentStatusTable';

type TabContentProps = {
  type: 'mentor' | 'student';
};

const TabContent = (props: TabContentProps) => {
  const { type } = props;

  return (
    <>
      <FilterContent type={type} />

      <TableContent key={type} type={type} />
    </>
  );
};

export default TabContent;
