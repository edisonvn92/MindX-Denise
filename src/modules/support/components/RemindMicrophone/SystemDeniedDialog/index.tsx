import React from 'react';
import { Typography } from '@mx/ui';
import ErrorMessage from '../ErrorMessage';
import { DialogProps } from '../MediaOnboardingDialog';

const SystemDeniedDialog = (props: DialogProps) => {
  const { checkMediaPermissions, errorDetails } = props;
  const settingsDataByOS = {
    macOS: {
      name: 'System Preferences',
      link: 'x-apple.systempreferences:com.apple.preference.security?PrivacyCamera',
    },
  };

  return (
    <div>
      <Typography fontTypo="" content="Can't use your camera or microphone" />
      <div>
        Your browser might not have access to your camera or microphone. To fix this problem, open{' '}
        {
          // @ts-ignore
          settingsDataByOS[browser.getOSName()] ? (
            <button
              type="button"
              onClick={() => {
                window.open(
                  // @ts-ignore
                  settingsDataByOS[browser.getOSName()].link,
                  '_blank',
                );
              }}
            >
              {
                // @ts-ignore
                settingsDataByOS[browser.getOSName()].name
              }
            </button>
          ) : (
            'Settings'
          )
        }
        .
      </div>
      <ErrorMessage errorDetails={errorDetails} />
    </div>
  );
};

export default SystemDeniedDialog;
