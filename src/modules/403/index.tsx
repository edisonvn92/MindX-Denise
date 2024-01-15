import React from 'react';
import { Button } from '@mx/ui';
import { config } from '@/config';
import image403 from '@/assets/images/403.jpg';

export const NoPermissionView = () => {
  const logout = (): void => {
    const currentUrl = window.location.href;
    window.location.href = `${config.base.webUrl}/logout?callbackUrl=${currentUrl}`;
  };

  return (
    <div className="h-full text-center bg-mx-white flex flex-col">
      <img src={image403} alt="403" />
      <div>
        <Button
          type="filled-primary"
          className="mt-6 font-bold rounded"
          onClick={logout}
          content="Go back"
          size="large"
        />
      </div>
    </div>
  );
};
