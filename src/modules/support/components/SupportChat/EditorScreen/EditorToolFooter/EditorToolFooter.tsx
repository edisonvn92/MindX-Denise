import React, { useEffect, useState } from 'react';
import { Button, Typography } from '@mx/ui';
import { useAppContext, useCoreContext } from '@/core';
import { GetIcon } from '@/components';
import { useResponsive } from '@/core/hooks/useResponsive';
import './index.scss';

interface EditorFooterProps {
  setIsEndDialogOpened: React.Dispatch<React.SetStateAction<boolean>>;
  isStudent: boolean;
}

export const EditorToolFooter: React.FC<EditorFooterProps> = (props: EditorFooterProps) => {
  const { isStudent, setIsEndDialogOpened } = props;
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const { t } = useAppContext();
  const { localStream, remoteStream, setIsBlockedMicrophone, isBlockedMicrophone } =
    useCoreContext();
  const { audioAllowed } = useCoreContext();

  const toggleIsMuted = () => {
    if (localStream.current.srcObject) {
      localStream.current.srcObject.getAudioTracks()[0].enabled = isMuted;
      setIsMuted(!isMuted);
    } else {
      setIsBlockedMicrophone(true);
    }
  };

  useEffect(() => {
    if (isBlockedMicrophone) {
      setIsMuted(true);
    }
  }, [isBlockedMicrophone]);

  /* eslint-disable */
  return (
    <div
      id="editorToolFooter"
      className={` border border-solid border-mx-gray-200  bg-mx-white rounded-xl h-full flex justify-between p-4`}
    >
      <div className="flex">
        <div className="p-2 bg-mx-gray-50 rounded-lg flex mr-4">
          <div className="flex px-2 pb-3 pt-4">
            <GetIcon icon="IoEllipse" className="text-mx-green-600 mr-2 mt-1 w-4 h-4" />
            <Typography
              content={isStudent ? t('support:sharingEditor') : t('support:watchingEditor')}
              fontTypo="body-m-desktop"
            />
          </div>
          <div className="flex px-2 pb-3 pt-4">
            <GetIcon icon="IoEllipse" className="text-mx-green-600 mr-2 mt-1 w-4 h-4" />
            <Typography
              content={isStudent ? t('support:sharingLesson') : t('support:watchingLesson')}
              fontTypo="body-m-desktop"
            />
          </div>
        </div>
        <div
          className={`${
            !audioAllowed ? 'text-gray-200' : 'footer-button'
          } cursor-pointer  py-2 px-3 rounded-xl mr-4`}
          onClick={toggleIsMuted}
        >
          <div className="flex w-full justify-center mb-2">
            {isMuted ? (
              <GetIcon icon="IoMic" className="w-6 h-6" />
            ) : (
              <GetIcon icon="IoMicOff" className="w-6 h-6" />
            )}
          </div>
          <div className="flex w-full justify-center">
            <Typography
              content={isMuted ? t('common:unMuteVoice') : t('common:muteVoice')}
              fontTypo="body-s-desktop"
            />
          </div>
        </div>
        <video ref={localStream} muted autoPlay src="" id="localStream" className="w-0 h-0" />

        <video ref={remoteStream} autoPlay src="" id="remoteStream" className="w-0 h-0" />
        {isStudent ? undefined : (
          <div className="cursor-pointer py-2 px-3 rounded-xl footer-button">
            <div className="flex w-full justify-center mb-2">
              <GetIcon icon="IoPencilOutline" className="w-6 h-6" />
            </div>
            <div className="flex w-full justify-center">
              <Typography content={t('common:note')} fontTypo="body-s-desktop" />
            </div>
          </div>
        )}
      </div>
      <div className="my-3">
        {isStudent ? undefined : (
          <Button
            type="outlined-danger"
            size="medium"
            content={
              <Typography content={t('common:end')} fontTypo="body-l-desktop" weight="semibold" />
            }
            className="m-auto"
            onClick={() => setIsEndDialogOpened(true)}
          />
        )}
      </div>
    </div>
  );
  /* eslint-disable */
};
