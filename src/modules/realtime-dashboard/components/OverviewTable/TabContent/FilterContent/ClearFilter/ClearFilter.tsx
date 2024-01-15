import React from 'react';
import _ from 'lodash';
import { Button, Typography } from '@mx/ui';
import { useAppContext, useCoreContext } from '@/core';

const ClearFilter = () => {
  const { t } = useAppContext();
  const { setFilter, initialStateFilter, filter } = useCoreContext();
  const clearFilter = () => {
    setFilter(() => initialStateFilter);
  };
  return (
    <div className="flex items-center justify-between mx-2">
      {!_.isEqual(initialStateFilter, filter) && (
        <Button
          className="text-mx-yellow-600 border-mx-yellow-600"
          size="medium"
          type="outlined-cta"
          content={
            <Typography fontTypo="body-l-desktop" weight="semibold" content={t('common:clear')} />
          }
          onClick={clearFilter}
        />
      )}
    </div>
  );
};

export default ClearFilter;
