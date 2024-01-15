export const useCheckPermission = () => {
  const ensurePermission = (permissionUser: string[], permissionCheck: string) => {
    if (permissionUser && permissionUser.includes(permissionCheck)) {
      return true;
    }
    return false;
  };

  return {
    ensurePermission,
  };
};
