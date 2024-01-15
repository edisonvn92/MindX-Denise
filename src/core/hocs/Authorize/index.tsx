import React from 'react';
import { useSSOAuthentication } from '@/core/hooks';
import { Loading, FullView } from '@/components';
import './index.scss';
import { NoPermissionView } from '@/modules/403';

export function Authorize<T>(Component: React.FC, checkPermission: string): React.FC<T> {
  // eslint-disable-next-line react/display-name
  return (props: any) => {
    const { isAuthenticated, isAuthorize, loading } = useSSOAuthentication(true, checkPermission);
    const checkedAuthenticated =
      typeof isAuthenticated === 'boolean' && !loading && !isAuthenticated;
    const checkedAuthorize = typeof isAuthorize === 'boolean' && !loading && !isAuthorize;
    if (isAuthenticated && isAuthorize && !loading) {
      return <Component {...props} />;
    }
    if (checkedAuthenticated || checkedAuthorize) {
      return (
        <FullView className="container-center">
          <NoPermissionView />
        </FullView>
      );
    }
    return (
      <FullView className="container-center h-screen">
        <Loading sizeProps="large" />
      </FullView>
    );
  };
}
