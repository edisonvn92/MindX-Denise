import React from 'react';
import { Button, Typography } from '@mx/ui';
import { useLocation } from 'react-router-dom';
import { GetIcon, Loading } from '@/components';
import { useAppContext, useCoreContext } from '@/core';
import { SupportStatusEnum } from '@/modules/support/helper/SupportStatusEnum';
import { useResponsive } from '@/core/hooks/useResponsive';
import { ContentSizeEnum } from '@/core/context/AppContext';
import './index.scss';

type NavbarProps = {
  setIsExitDialogOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

const StudentLessonNavbar = (props: NavbarProps) => {
  const { setIsExitDialogOpened } = props;
  const { t } = useAppContext();
  const { supportStatus, setSupportStatus, setIsRequestSupportPanelOpened } = useCoreContext();
  const { state } = useLocation();

  const { boxWrapperMatches } = useResponsive();

  const openRequestSupport = () => {
    if (setSupportStatus) setSupportStatus(SupportStatusEnum.Requesting);
    setIsRequestSupportPanelOpened(true);
  };

  const onClickBack = () => {
    setIsExitDialogOpened(true);
  };

  return (
    <div
      className={`navbar-wrapper w-full bg-mx-white flex p-0 m-0 z-10 h-16 leading-5 text-lg ${
        supportStatus === SupportStatusEnum.Started ? 'hide-navbar' : ' light03 p-4'
      } ${boxWrapperMatches(ContentSizeEnum.ExtraLarge)}`}
    >
      {!(supportStatus === SupportStatusEnum.Started) && (
        <div className="w-full flex text-center justify-between">
          <div className="flex justify-flex-start items-center">
            <div className="cursor-pointer back-to-home" onClick={onClickBack}>
              <GetIcon icon="IoChevronBackOutline" />
            </div>
            <Typography
              content={`${state?.courseName}`}
              weight="regular"
              fontTypo="body-s-desktop"
            />
            <span> &nbsp; / &nbsp;</span>
            <Typography
              fontTypo="body-m-desktop"
              weight="bold"
              content={state?.lesson?.name || 'Untitled'}
            />
          </div>
          <div className="support-btn flex justify-flex-center items-center">
            <Button
              className="border-none font-medium"
              size="large"
              type="filled-primary"
              content={
                supportStatus === SupportStatusEnum.Waiting
                  ? `${t('support:searchingMentor')}...`
                  : t('common:support')
              }
              disabled={supportStatus === SupportStatusEnum.Waiting}
              leftIcon={
                supportStatus === SupportStatusEnum.Waiting ? (
                  <Loading sizeProps="small" />
                ) : undefined
              }
              rightIcon={<GetIcon icon="IoChatbubblesSharp" className="w-4 h-4" />}
              onClick={openRequestSupport}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default StudentLessonNavbar;
