import React, { useEffect, useRef, useState } from 'react';
import { TextField } from '@mx/ui';
import { debounce } from 'lodash';
import { useAppContext, useCoreContext } from '@/core';
import { GetIcon } from '@/components';

const SearchInput = () => {
  const { t } = useAppContext();
  const { setFilter, filter } = useCoreContext();
  const [value, setValue] = useState<string>('');

  const debouncedSearch = useRef(
    debounce(async (criteria) => {
      setFilter({ ...filter, studentName: criteria });
    }, 500),
  ).current;

  const handleChange = (e: any) => {
    setValue(e.target.value);
    debouncedSearch(e.target.value);
  };

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  useEffect(() => {
    if (filter) setValue(filter.studentName);
  }, [filter]);

  return (
    <TextField
      className="w-full h-[44px]"
      type="text"
      onChange={handleChange}
      placeholder={t('common:findByStudentName')}
      leftIcon
      leftIconSwap={<GetIcon icon="IoSearchOutline" className="w-5 h-5 items-center my-auto" />}
      value={value}
    />
  );
};

export default SearchInput;
