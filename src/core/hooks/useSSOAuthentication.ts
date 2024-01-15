import { useEffect, useState } from 'react';
import { getCustomTokenFromSSOServer, authenticate, navigateOnFailures, authorize } from '@/core';
import '@/core/firebase';
import { config } from '@/config';

export const useSSOAuthentication = (authenticationRequired: boolean, permissionCheck: string) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);
  const [isAuthorize, setIsAuthorized] = useState<boolean | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const execSSOAuthenticate = async () => {
    try {
      setLoading(true);
      let userId = config.test?.userLocalID;

      if (config.test?.env !== 'local') {
        const customToken = await getCustomTokenFromSSOServer();
        const { userId: newUserId } = await authenticate(customToken);
        userId = newUserId;
      }
      if (permissionCheck) {
        const permissions = await authorize();
        if (Array.isArray(permissions) && permissions.length > 0) {
          const havePermission = permissions.includes(permissionCheck);
          setIsAuthorized(havePermission);
        } else {
          setIsAuthorized(false);
        }
      }
      if (userId) {
        setIsAuthenticated(true);
      } else {
        // setIsAuthorized(false);
      }
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      execSSOAuthenticate();
    }
  }, []);

  navigateOnFailures(isAuthenticated, authenticationRequired);

  return {
    isAuthenticated,
    isAuthorize,
    loading,
  };
};
