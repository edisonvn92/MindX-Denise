import React from 'react';
import { Typography } from '@mx/ui';

interface TagProps {
  content: string;
  type: 'success' | 'warning' | 'error';
}

const Tag = (props: TagProps) => {
  const { type, content } = props;

  const tagStyle = {
    success: 'bg-mx-green-600',
    warning: 'bg-mx-yellow-600',
    error: 'bg-mx-red-600',
  };

  const renderTag = () => {
    return (
      <div className="flex ">
        <Typography
          content={content}
          className={`rounded-lg text-mx-white p-2 ${tagStyle[type]}`}
          fontTypo="body-s-desktop"
        />
      </div>
    );
  };

  return <>{renderTag()}</>;
};

export default Tag;
