/* eslint-disable import/no-extraneous-dependencies */
import React, { Suspense, useEffect, useState } from 'react';
import { useToast } from '@mx/ui';
import { useMutation, useStatus } from '../context/liveblock.config';
import { DraggableStudentLesson } from '../components/DraggableStudentLesson/DraggableStudentLesson';
import { useCoreContext } from '@/core';
import scratchIcon from '@/assets/images/Scratch-icon.png';
import './index.scss';
import ScratchEditor from '@/modules/lesson/components/Editor';

interface StudentLessonLearnProps {
  liveBlockRoomId: string;
}

export const StudentLessonComponent: React.FC<StudentLessonLearnProps> = (
  props: StudentLessonLearnProps,
) => {
  const { liveBlockRoomId } = props;
  const { scratchState } = useCoreContext();
  const roomStatus = useStatus();
  const [isEditorShown, setIsEditorShown] = useState<boolean>(false);

  const modifyScratchState = useMutation(
    ({ storage }) => {
      const state = storage.get('scratchGui');
      state.set('data', scratchState);
      state.set('lastId', undefined);
    },
    [scratchState],
  );

  useEffect(() => {
    if (roomStatus === 'connected' && scratchState) {
      setTimeout(() => {
        try {
          modifyScratchState();
        } catch (e) {
          useToast().addToast({
            status: 'error',
            header: 'Unable to connect to LiveBlocks',
          });
        }
      }, 100);
    }
  }, [scratchState, roomStatus]);

  useEffect(() => {
    const handleTabEvent = (ev: KeyboardEvent) => {
      if (ev.key === 'Tab') {
        setIsEditorShown(!isEditorShown);
      }
    };
    window.addEventListener('keyup', handleTabEvent);
    return () => window.removeEventListener('keyup', handleTabEvent);
  }, [isEditorShown]);

  return (
    <div className={`relative h-full w-full z-5 `}>
      <div
        className={`rounded-b-xl cursor-pointer flex justify-center medium-indicator absolute top-0 z-[999] right-[13%]
           ${isEditorShown ? 'bg-mx-white ' : 'bg-mx-gray-100'}`}
        onClick={() => {
          setIsEditorShown(true);
        }}
      >
        <img src={scratchIcon} alt="scratchIcon" className="w-7 h-7 m-auto" />
      </div>

      <div className="absolute top-0 w-full h-full z-0">
        <ScratchEditor liveBlockRoomId={liveBlockRoomId} />
      </div>

      <DraggableStudentLesson
        isEditorShown={isEditorShown as boolean}
        setIsEditorShown={setIsEditorShown}
      />
    </div>
  );
};
