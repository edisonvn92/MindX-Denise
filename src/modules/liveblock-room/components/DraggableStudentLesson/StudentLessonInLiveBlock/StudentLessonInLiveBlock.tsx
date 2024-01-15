import React, { useEffect, useState } from 'react';
import { useToast } from '@mx/ui';
import { StudentLessonSlidesInLiveBlock } from './StudentLessonSlidesInLiveBlock';
import { useCoreContext } from '@/core';
import { ContentSizeEnum } from '@/core/context/AppContext';
import { Loading } from '@/components';
import { useResponsive } from '@/core/hooks/useResponsive';
import { useMutation, useStatus } from '@/modules/liveblock-room/context/liveblock.config';
import './index.scss';

interface StudentLearnProps {
  contentSize: ContentSizeEnum;
  setIsEditorShown: React.Dispatch<React.SetStateAction<boolean>>;
  isResizing?: boolean;
}
export const StudentLessonInLiveBlock: React.FC<StudentLearnProps> = (props: StudentLearnProps) => {
  const { contentSize = ContentSizeEnum.ExtraLarge, setIsEditorShown, isResizing } = props;
  const { studentLesson } = useCoreContext();
  const [loading, setLoading] = useState<boolean>(true);

  const roomStatus = useStatus();
  const { topPaddingWrapperMatches } = useResponsive();

  const modifyLessonPages = useMutation(
    ({ storage }) => {
      const lesson = storage.get('pageData').get('studentLesson');
      lesson.set('learningProgresses', studentLesson.learningProgresses);
      lesson.set('status', studentLesson.status);
    },
    [studentLesson],
  );

  useEffect(() => {
    if (roomStatus === 'connected') {
      setTimeout(() => {
        try {
          if (studentLesson) modifyLessonPages();
        } catch (e) {
          useToast().addToast({
            status: 'error',
            header: 'Unable to connect to LiveBlocks',
          });
        }
        setLoading(false);
      }, 500);
    }
  }, [studentLesson, roomStatus]);

  return (
    <div
      className={`bg-mx-white h-full w-full flex flex-col relative overflow-hidden rounded-xl ${topPaddingWrapperMatches(
        contentSize,
      )}`}
    >
      {loading ? (
        <div className="text-center grow" style={{ paddingTop: '20%' }}>
          <Loading sizeProps="large" />
        </div>
      ) : (
        <StudentLessonSlidesInLiveBlock
          contentSize={contentSize}
          setIsEditorShown={setIsEditorShown}
          isResizing={isResizing}
        />
      )}
    </div>
  );
};
