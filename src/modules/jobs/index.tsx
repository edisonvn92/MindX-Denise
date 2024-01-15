import React from 'react';
import { Button } from '@mx/ui';

export const JobPage: React.FC<unknown> = () => {
  return (
    <div>
      <Button
        content="This is content of hihi"
        title="This is title"
        type="outlined-primary"
        size="small"
      />
    </div>
  );
};
