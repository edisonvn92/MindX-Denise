import React from 'react';
import { MediaPermissionsError } from '../MediaOnboardingDialog';

type ErrorProps = {
  errorDetails?: MediaPermissionsError;
};

const ErrorMessage = (props: ErrorProps) => {
  const { errorDetails } = props;
  if (!errorDetails) return null;

  return <div style={{ marginTop: 10 }}>{errorDetails.message}</div>;
};

export default ErrorMessage;
