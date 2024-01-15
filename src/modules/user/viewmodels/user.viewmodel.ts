// Generate code from clean architecture template

import { useState } from 'react';
import { useToast } from '@mx/ui';
import { UserHttpRepository } from '../adapters/repositories';
import { useBaseViewModel } from '@/core';
import { UserEntity } from '@/domains/user/entities';
import { FindCurrentUserUseCase, GetUserPermissionsUseCase } from '@/domains/user/usecases';

export default function UserViewModel() {
  const repo = new UserHttpRepository();
  const findCurrentUC = new FindCurrentUserUseCase(repo);
  const getPermissionUC = new GetUserPermissionsUseCase(repo);
  const { loading, error, catchAction } = useBaseViewModel();
  const [currentUserData, setCurrentUser] = useState<{ data: UserEntity }>({
    data: {
      id: '',
      fullName: '',
      roles: [],
    },
  });
  const [permissionData, setPermissionData] = useState<string[] | undefined>(undefined);
  const toast = useToast();

  const actionGetCurrentUser = () => {
    catchAction(async () => {
      const { dataDetail } = await findCurrentUC.run();
      if (dataDetail) setCurrentUser({ data: dataDetail });
      else {
        toast.addToast({ status: 'error', header: 'Error', description: 'Authentication invalid' });
      }
    });
  };

  const actionGetPermission = async () => {
    let permissionList: string[] = [];
    await catchAction(async () => {
      permissionList = await getPermissionUC.run();
      setPermissionData(permissionList);
    });
    return Promise.resolve(permissionList);
  };

  return {
    loading,
    error,
    currentUserData,
    actionGetCurrentUser,
    permissionData,
    actionGetPermission,
  };
}
