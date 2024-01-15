import React, { useEffect, useRef } from 'react';
import UserDeniedDialog from './UserDeniedDialog';
import SystemDeniedDialog from './SystemDeniedDialog';
import TrackErrorDialog from './TrackErrorDialog';
import ExpanationDialog from './ExpanationDialog';
import { useCoreContext } from '@/core';

export enum DialogType {
  EXPANATION = 'EXPANATION',
  SYSTEMDENINED = 'SYSTEMDENINED',
  USERDENINED = 'USERDENINED',
  TRACKERROR = 'TRACKERROR',
}

enum MediaPermissionErrorType {
  SYSTEMPERMISSIONDENINED = 'SystemPermissionDenied',
  USERPERMISSIONDENIED = 'UserPermissionDenied',
  GENERIC = 'Generic',
}

export type MediaPermissionsError = {
  type?: MediaPermissionErrorType;
  name: string;
  message?: string;
};

export type DialogProps = {
  errorDetails?: MediaPermissionsError;
  text?: string;
  setShowDialog: React.Dispatch<React.SetStateAction<DialogType | null>>;
  onCloseDialog(): void;
};

const MediaOnboardingDialog = () => {
  const { audioAllowed, setAudioAllowed, showDialog, setShowDialog, errorDetails } =
    useCoreContext();

  // Create wrapper refs to access values even during setTimeout
  const showDialogRef = useRef(showDialog);
  showDialogRef.current = showDialog;
  const audioAllowedRef = useRef(audioAllowed);
  audioAllowedRef.current = audioAllowed;

  const handleError = () => {
    if (errorDetails?.type === MediaPermissionErrorType.SYSTEMPERMISSIONDENINED) {
      // user denied permission
      setShowDialog(DialogType.SYSTEMDENINED);
    } else if (errorDetails?.type === MediaPermissionErrorType.USERPERMISSIONDENIED) {
      // browser doesn't have access to devices
      setShowDialog(DialogType.USERDENINED);
    } else {
      setShowDialog(DialogType.TRACKERROR);
    }
  };

  useEffect(() => {
    if (errorDetails || audioAllowed) {
      handleError();
    }
  }, [errorDetails, audioAllowed]);

  useEffect(() => {
    if (!audioAllowed) {
      setShowDialog(DialogType.EXPANATION);
    }
  }, [audioAllowed]);

  const onCloseDialog = () => {
    setShowDialog(null);
  };

  const renderDialogContent = () => {
    switch (showDialog) {
      case DialogType.EXPANATION:
        return (
          <ExpanationDialog
            showDialog={showDialog}
            setAudioAllowed={setAudioAllowed}
            onCloseDialog={onCloseDialog}
          />
        );
      case DialogType.USERDENINED:
        return (
          <UserDeniedDialog
            errorDetails={errorDetails}
            setShowDialog={setShowDialog}
            onCloseDialog={onCloseDialog}
          />
        );
      case DialogType.TRACKERROR:
        return (
          <TrackErrorDialog
            errorDetails={errorDetails}
            setShowDialog={setShowDialog}
            onCloseDialog={onCloseDialog}
          />
        );
      default:
        return (
          <TrackErrorDialog
            errorDetails={errorDetails}
            setShowDialog={setShowDialog}
            onCloseDialog={onCloseDialog}
          />
        );
    }
  };

  return <div>{showDialog && renderDialogContent()}</div>;
};

export default MediaOnboardingDialog;
