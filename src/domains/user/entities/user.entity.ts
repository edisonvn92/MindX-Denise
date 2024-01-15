// Generate code from clean architecture template
/* eslint-disable @typescript-eslint/no-empty-interface */

export interface Role {
  name: string;
  description: string;
  permissions: string[];
  isActive: boolean;
}
export interface UserEntity {
  id: string;
  givenName?: string;
  familyName?: string;
  fullName: string;
  phoneNo?: string;
  address?: string;
  description?: string;
  avatarUrl?: string;
  dob?: string;
  gender?: string;
  roles: Role[] | string[];
  completeSignUp?: boolean;
  isActive?: boolean;
}
