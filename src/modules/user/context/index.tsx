import React from 'react';
import { PageProvider } from '@/core/context/PageContext';

export const UserProfileProvider = (props: any) => {
  const { children } = props;
  return <PageProvider>{children}</PageProvider>;
};
