import React, { useEffect, useState } from 'react';
import { Typography } from '@mx/ui';
import { useNavigate } from 'react-router-dom';
import { SupportListItem } from '../SupportListItem/SupportListItem';
import RequestNotAvailable from '../../SupportChat/RequestNotAvailable';
import { DeleteDialog } from '@/components';
import { useAppContext, useCoreContext, useSocketContext } from '@/core';
import { SupportEntity } from '@/domains/support/entities';
import './index.scss';
import { FindSupportByMentorIdInput } from '@/domains/support/ports/payloads';

interface SupportListProps {
  supportList: SupportEntity[];
}

export const SupportListTable: React.FC<SupportListProps> = (props: SupportListProps) => {
  const { supportList } = props;
  const { t, currentUser } = useAppContext();
  const { actionAcceptRequestSupport, onRecallRequest } = useCoreContext();
  const { setIsDetailDialogOpened, actionRejectRequestSupport, actionGetSupportByMentorId } =
    useCoreContext();
  const [selectedItem, setSelectedItem] = useState<SupportEntity | undefined>(undefined);
  const [isRejectDialogOpened, setIsRejectDialogOpened] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isErrorOnRecall, setIsErrorOnRecall] = useState<boolean>(false);

  const { isOnRecall } = useSocketContext();
  const navigate = useNavigate();
  const getSupportPayload: FindSupportByMentorIdInput = {
    isCompleted: false,
    mentorUid: currentUser?.id || '',
  };

  const onClickSeeDetail = (item: SupportEntity) => {
    setSelectedItem(item);
    setIsDetailDialogOpened(true);
  };

  const onCLickReject = async (index: number, supportItem?: SupportEntity) => {
    setSelectedIndex(index);
    setIsRejectDialogOpened(true);
  };

  const onRejectRequest = async () => {
    setIsRejectDialogOpened(false);
    if (isOnRecall) {
      await actionRejectRequestSupport({
        id: supportList[selectedIndex].id,
        mentorUid: currentUser?.id,
      });
    } else {
      await actionRejectRequestSupport({
        mentorUid: currentUser?.id || '',
        id: supportList[selectedIndex].id,
      });
    }
  };

  const onClickAccept = async (supportItem: SupportEntity) => {
    await actionAcceptRequestSupport({
      mentorUid: currentUser?.id || '',
      id: supportItem.id,
    });
    sessionStorage.setItem('supportItem', JSON.stringify(supportItem));
    setTimeout(() => {
      window.location.href = '/support-chat';
    }, 500);
  };

  const onClickRecall = async (supportItem: SupportEntity) => {
    sessionStorage.setItem('supportItem', JSON.stringify(supportItem));
    await onRecallRequest(supportItem).catch(() => {
      setIsErrorOnRecall(true);
    });
  };

  useEffect(() => {
    const getSupportInterval = setInterval(() => {
      actionGetSupportByMentorId(getSupportPayload);
    }, 5000);
    return () => {
      clearInterval(getSupportInterval);
    };
  }, []);

  return (
    <>
      <div className="rounded-lg bg-mx-gray-100 w-full flex mt-4">
        <div className="p-2 course-col mr-4">
          <Typography content={t('common:course')} fontTypo="body-s-desktop" weight="semibold" />
        </div>
        <div className="p-2 lesson-col">
          <Typography content={t('common:lesson')} fontTypo="body-s-desktop" weight="semibold" />
        </div>

        <div className="p-2 detail-col">
          <Typography content={t('common:detail')} fontTypo="body-s-desktop" weight="semibold" />
        </div>

        <div className="p-2 w-[11%]">
          <Typography
            content={t('support:supportType')}
            fontTypo="body-s-desktop"
            weight="semibold"
          />
        </div>
        <div className="p-2 grow">
          <Typography content={t('common:action')} fontTypo="body-s-desktop" weight="semibold" />
        </div>
      </div>
      {supportList.map((supportItem: SupportEntity, index: number) => {
        return (
          <SupportListItem
            supportItem={supportItem}
            onClickDetail={onClickSeeDetail}
            onCLickReject={() => onCLickReject(index)}
            onClickAccept={() => onClickAccept(supportItem)}
            onClickRecall={() => onClickRecall(supportItem)}
            key={index}
          />
        );
      })}

      {isErrorOnRecall && (
        <RequestNotAvailable
          isErrorOnRecall={isErrorOnRecall}
          setIsErrorOnRecall={setIsErrorOnRecall}
        />
      )}

      <DeleteDialog
        title={t('support:doYouWantToRejectRequest')}
        body={t('common:thisActionIsIrreversible')}
        deleteBtnLabel={t('common:refuse')}
        isOpened={isRejectDialogOpened}
        onDelete={onRejectRequest}
        onClose={() => setIsRejectDialogOpened(false)}
        className="delete-dialog"
      />
    </>
  );
};
