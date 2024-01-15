import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SupportChatScreen } from '../SupportChat/SupportChatScreen';
import { MentorFoundScreen, RequestSupport, RequestSupportExpiredScreen } from '../../components';
import { SupportStatusEnum } from '../../helper/SupportStatusEnum';
import { StudentLessonLearn } from '@/modules/student-lesson/screens/LessonLearn';
import { useAppContext, useCoreContext } from '@/core';
import './index.scss';
import { useDataLayerAction } from '@/core/context/TagContext';
import { socket } from '@/core/context/SocketContext';
import { EventCommand, StudentStatusEnum } from '@/domains/realtime-dashboard/entities';
import { CoreDesignDialog } from '@/components';

export const StudentLessonWithSupport: React.FC = () => {
  const { supportStatus, isRequestSupportPanelOpened, liveBlockRoomId, sessionStartLesson } =
    useCoreContext();
  const { currentUser } = useAppContext();
  const dataLayerAction = useDataLayerAction();

  const { state } = useLocation();

  useEffect(() => {
    if (supportStatus === SupportStatusEnum.Started) {
      dataLayerAction({
        event: 'LIVE_SUPPORT',
        data: {
          user_id: currentUser?.id,
          fullname: currentUser?.fullName,
          role: currentUser?.givenName,
          supportStatus,
        },
      });

      socket.emit(
        EventCommand.StudentSupport,
        JSON.stringify({
          uid: currentUser?.id,
          lessonId: state?.lesson.id,
          courseId: state?.courseId,
          status: StudentStatusEnum.BeSupporting,
        }),
      );
    }
  }, [supportStatus]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      const e = event || window.event;
      if (e) {
        e.returnValue = ''; // Legacy method for cross browser support
        dataLayerAction({
          event: 'LEARN',
          data: {
            user_id: currentUser?.id,
            learning_time: (new Date().getTime() - sessionStartLesson) / 1000 / 60 / 60,
          },
        });
      }
      return undefined;
    };
    // Attach the event listener when the component mounts
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <>
      <div className="bg-mx-white flex flex-col flex-wrap">
        <div>
          {liveBlockRoomId ? (
            <SupportChatScreen
              isSupported={
                supportStatus === SupportStatusEnum.Started ||
                supportStatus === SupportStatusEnum.MentorFound
              }
              mainScreen={<StudentLessonLearn />}
            />
          ) : undefined}
        </div>
      </div>

      {isRequestSupportPanelOpened ? (
        <div className="bg-mx-white h-screen px-20 py-10 flex flex-col flex-wrap overflow-auto overlay-screen">
          <RequestSupport />
        </div>
      ) : undefined}
      <CoreDesignDialog
        maskClosable={false}
        open={!isRequestSupportPanelOpened && supportStatus === SupportStatusEnum.Expired}
        onClose={() => {}}
        body={<RequestSupportExpiredScreen />}
        closeIcon={<div />}
        className="w-[570px] p-8"
      />
      <CoreDesignDialog
        maskClosable={false}
        open={!isRequestSupportPanelOpened && supportStatus === SupportStatusEnum.MentorFound}
        onClose={() => {}}
        body={<MentorFoundScreen />}
        closeIcon={<div />}
        className="w-[570px] p-8"
      />
    </>
  );
};
