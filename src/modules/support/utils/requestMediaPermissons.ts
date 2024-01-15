import bowser from 'bowser';

type MediaPermissionsErrorType = {
  Generic?: any;
  SystemPermissionDenied?: any;
  UserPermissionDenied?: any;
  CouldNotStartVideoSource?: any;
};

const MediaPermissionsErrorType: MediaPermissionsErrorType = {
  Generic: 'Generic',
  SystemPermissionDenied: 'SystemPermissionDenied',
  UserPermissionDenied: 'UserPermissionDenied',
  CouldNotStartVideoSource: 'CouldNotStartVideoSource',
};

export const requestMediaPermissions = (
  constraints: { audio: boolean; video: boolean } | null = null,
) => {
  return new Promise((resolve, reject) => {
    navigator.mediaDevices
      .getUserMedia(constraints !== null ? constraints : { audio: true, video: false })
      .then((stream) => {
        stream.getTracks().forEach((t) => {
          t.stop();
        });
        resolve(stream);
      })
      .catch((err) => {
        const browser = bowser.getParser(window.navigator.userAgent);
        const browserName = browser.getBrowserName();
        const errName = err.name;
        const errMessage = err.message;
        let errorType = MediaPermissionsErrorType.Generic;
        if (browserName === 'Chrome') {
          if (errName === 'NotAllowedError') {
            if (errMessage === 'Permission denied by system') {
              errorType = MediaPermissionsErrorType.SystemPermissionDenied;
            } else if (errMessage === 'Permission denied') {
              errorType = MediaPermissionsErrorType.UserPermissionDenied;
            }
          } else if (errName === 'NotReadableError') {
            errorType = MediaPermissionsErrorType.CouldNotStartVideoSource;
          }
        } else if (browserName === 'Safari') {
          if (errName === 'NotAllowedError') {
            errorType = MediaPermissionsErrorType.UserPermissionDenied;
          }
        } else if (browserName === 'Microsoft Edge') {
          if (errName === 'NotAllowedError') {
            errorType = MediaPermissionsErrorType.UserPermissionDenied;
          } else if (errName === 'NotReadableError') {
            errorType = MediaPermissionsErrorType.CouldNotStartVideoSource;
          }
        } else if (browserName === 'Firefox') {
          if (errName === 'NotFoundError') {
            errorType = MediaPermissionsErrorType.SystemPermissionDenied;
          } else if (errName === 'NotReadableError') {
            errorType = MediaPermissionsErrorType.SystemPermissionDenied;
          } else if (errName === 'NotAllowedError') {
            errorType = MediaPermissionsErrorType.UserPermissionDenied;
          } else if (errName === 'AbortError') {
            errorType = MediaPermissionsErrorType.CouldNotStartVideoSource;
          }
        }
        reject({
          type: errorType,
          name: err.name,
          message: err.message,
        });
      });
  });
};

export const requestAudioPermissions = () => requestMediaPermissions({ audio: true, video: false });
