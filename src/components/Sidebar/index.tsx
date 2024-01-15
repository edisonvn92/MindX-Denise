/* eslint-disable no-restricted-syntax */
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GetIcon } from '../Icons/Icons';
import { UserInfo } from './UserInfo';
import { useAppContext } from '@/core';
import logo from '@/assets/images/logo.svg';
import { Typography } from '@/mx';
import { PERMISSIONS } from '@/core/constants/permission.constant';
import './index.scss';

type Props = {
  collapsed: boolean;
  setCollapsed(collapsed: boolean): void;
};

type MenuItem = {
  label: React.ReactNode;
  path: string;
  icon?: React.ReactNode;
  permission?: string;
  isActive?: boolean;
};

const getItem = (
  label: React.ReactNode,
  path: string,
  icon?: React.ReactNode,
  permission?: string | undefined,
  isActive?: boolean,
): MenuItem => {
  return {
    path,
    icon,
    label,
    permission,
    isActive,
  } as MenuItem;
};

const authorMenuItems = (menuItems: any[]): MenuItem[] => {
  const canShowMenuItems: MenuItem[] = [];
  const userPermissionJSON = sessionStorage.getItem('userPermission') || '[]';
  const userPermission = JSON.parse(userPermissionJSON);

  for (const item of menuItems) {
    if (item?.permission === undefined) {
      canShowMenuItems.push(item);
    } else if (userPermission.includes(item?.permission)) {
      canShowMenuItems.push(item);
    }
  }
  return canShowMenuItems;
};

const SidebarScreen = (props: Props) => {
  const { collapsed, setCollapsed } = props;
  const navigate = useNavigate();
  const currentRoute = useLocation().pathname.split('/')[1];
  const { t, currentUser } = useAppContext();
  const items: MenuItem[] = [
    getItem(
      <Link to="/realtime" rel="noopener noreferrer">
        <Typography
          content={t('common:realtime')}
          fontTypo="body-m-desktop"
          className="text-mx-gray-900"
        />
      </Link>,
      '/realtime',
      <GetIcon icon="IoPieChartOutline" className={collapsed ? 'w-8 h-8' : 'w-6 h-6'} />,
      PERMISSIONS.COURSE.VIEW,
      currentRoute === 'realtime',
    ),
    getItem(
      <Link to="/courses" rel="noopener noreferrer">
        <Typography
          content={t('common:course')}
          fontTypo="body-m-desktop"
          className="text-mx-gray-900"
        />
      </Link>,
      '/courses',
      <GetIcon icon="IoTvOutline" className={collapsed ? 'w-8 h-8' : 'w-6 h-6'} />,
      PERMISSIONS.COURSE.VIEW,
      currentRoute === 'courses',
    ),
    getItem(
      <Link to="/student-courses" rel="noopener noreferrer">
        <Typography
          content={t('common:course')}
          fontTypo="body-m-desktop"
          className="text-mx-gray-900"
        />
      </Link>,
      '/student-courses',
      <GetIcon icon="IoTvOutline" className={collapsed ? 'w-8 h-8' : 'w-6 h-6'} />,
      PERMISSIONS.STUDENT_COURSE.VIEW,
      currentRoute === 'student-courses',
    ),
    getItem(
      <Link to="/support" rel="noopener noreferrer">
        <Typography
          content={t('common:homePage')}
          fontTypo="body-m-desktop"
          className="text-mx-gray-900"
        />
      </Link>,
      '/support',
      <GetIcon icon="IoHomeOutline" className={collapsed ? 'w-8 h-8' : 'w-6 h-6'} />,
      PERMISSIONS.SUPPORT.VIEW,
      currentRoute === 'support',
    ),
  ];
  return (
    <div
      id="app-sidebar"
      className="bg-mx-gray-50 light03 mr-2 flex flex-col p-4 sticky top-0 h-screen"
    >
      <Link to="/" className="text-white sidebar-logo mb-4">
        {collapsed ? (
          <img src={logo} alt="logo" className="w-16 h-10" />
        ) : (
          <span className="logo">
            <img src={logo} alt="logo" className="w-16 h-10" />
          </span>
        )}
      </Link>
      <ul className="grow p-0">
        {authorMenuItems(items).map((item) => {
          return (
            <li
              key={item.path}
              className={`px-4 py-3 rounded-lg flex gap-2  hover:bg-mx-gray-100 cursor-pointer ${
                item.isActive ? 'bg-mx-gray-100 ' : ''
              }`}
              onClick={() => {
                navigate(item.path);
              }}
            >
              {item.icon}
              {item.label}
            </li>
          );
        })}
      </ul>

      <UserInfo user={currentUser} />
    </div>
  );
};

export const Sidebar = SidebarScreen;
