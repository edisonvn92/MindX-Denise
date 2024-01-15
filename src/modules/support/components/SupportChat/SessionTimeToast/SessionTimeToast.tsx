import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Toast } from '@mx/ui';
import { useAppContext, useCoreContext } from '@/core';
import './index.scss';

export const SessionTimeToast: React.FC = () => {
  const { t } = useAppContext();
  const { sessionTimeLeft } = useCoreContext();
  const [isToastOpened, setIsToastOpened] = useState<boolean>(true);
  const [closeAfter2MinLeft, setCloseAfter2MinLeft] = useState<boolean>(false);

  useEffect(() => {
    if (sessionTimeLeft < 120000 && !isToastOpened && !closeAfter2MinLeft) {
      setIsToastOpened(true);
      setCloseAfter2MinLeft(true);
    }
  }, [sessionTimeLeft, isToastOpened, closeAfter2MinLeft]);

  return (
    <div className="absolute top-16 right-10 z-5">
      {isToastOpened ? (
        <Toast
          status="warning"
          header={
            t('support:sessionTimeRemaining') + dayjs.duration(sessionTimeLeft).format('mm:ss')
          }
          handleClose={() => setIsToastOpened(false)}
          className="session-time-toast"
          expiringTime={null}
        />
      ) : undefined}
    </div>
  );
};
