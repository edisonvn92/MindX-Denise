import { config } from '@/config';

export const navigateOnFailures = (
  isAuthenticated: boolean | undefined,
  authenticationRequired: boolean | undefined,
) => {
  if (isAuthenticated === false) {
    if (authenticationRequired) {
      window.location.href = `${config.base.webUrl}/login?callbackUrl=${window.location.href}`;
    }
  }
};
