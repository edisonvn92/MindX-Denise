import React from 'react';
import smallLoadingIcon from '@/assets/images/Loading_small.svg';
import largeLoadingIcon from '@/assets/images/Loading_large.svg';

export type LoadingProps = {
  sizeProps?: 'small' | 'large';
};
export const Loading: React.FC<LoadingProps> = (props: LoadingProps) => {
  const { sizeProps = 'small' } = props;
  return (
    <img
      src={sizeProps === 'small' ? smallLoadingIcon : largeLoadingIcon}
      className={sizeProps === 'small' ? 'w-6 h-6 animate-spin' : 'w-[88px] h-[88px] animate-spin'}
      alt="loading"
    />
  );
};
