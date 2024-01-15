import { gql } from '@apollo/client';
import { UserDataDetail } from './user-data';

export const FIND_USER = gql`
  query User_findOne {
    User_findOne {
    ${UserDataDetail}
  }
  }
`;

export const CREATE_BANK_ACCOUNT = gql`
  mutation User_createBankAccount($input: CreateBankAccountInput!) {
    User_createBankAccount(input: $input) {
      ${UserDataDetail}
    }
  }
`;

export const FIND_PERMISSION = gql`
  query User_getPermission {
    User_getPermission
  }
`;
