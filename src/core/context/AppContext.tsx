import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import { AppData } from './PageContext';
import i18n from '@/i18n';
import { config } from '@/config';
import UserViewModel from '@/modules/user/viewmodels/user.viewmodel';
import { UserEntity } from '@/domains/user/entities';

interface Data {
  permission?: string[];
  t: TFunction;
  changeLanguage(lng: string): Promise<TFunction>;
  currentLanguage: string;
  currentUser: UserEntity;
}

/* eslint-disable */
export enum ContentSizeEnum {
  Small = 'sm',
  Medium = 'md',
  Large = 'lg',
  ExtraLarge = 'xl',
}
/* eslint-disable */
export const AppProvider = (props: any) => {
  const { currentUserData, actionGetCurrentUser, permissionData, actionGetPermission } =
    UserViewModel();
  const { t } = useTranslation();
  const { language, changeLanguage } = i18n;

  useEffect(() => {
    actionGetCurrentUser();
    if (!permissionData) actionGetPermission();
  }, []);

  const data: Data = {
    permission: permissionData,
    t,
    changeLanguage,
    currentLanguage: language || config.i18n.defaultLang,
    currentUser: currentUserData.data,
  };

  // eslint-disable-next-line react/destructuring-assignment
  return <AppData {...data}>{props.children}</AppData>;
};
