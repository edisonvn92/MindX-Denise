import React from 'react';
import { useParams } from 'react-router-dom';
import { LiveList, LiveObject } from '@liveblocks/client';
import { unstable_batchedUpdates } from 'react-dom'; // eslint-disable-line camelcase
import { RoomProvider } from '../context/liveblock.config';
import { StudentLessonComponent } from './StudentLessonComponent';
import { useCoreContext } from '@/core';
import { PageProvider } from '@/core/context/PageContext';

interface LiveBlockProps {
  liveBlockRoomId?: string;
}

export const LiveBlockRoomScreen: React.FC<LiveBlockProps> = (props: LiveBlockProps) => {
  const { liveBlockRoomId } = props;
  const pageCoreContext = useCoreContext();
  const params = useParams();

  return (
    <RoomProvider
      unstable_batchedUpdates={unstable_batchedUpdates} // eslint-disable-line camelcase
      id={params.liveBlockId || liveBlockRoomId || ''}
      initialPresence={{ cursor: { x: 0, y: 0 } }}
      initialStorage={() => ({
        scratchGui: new LiveObject({
          xml: '',
        }),
        pageData: new LiveObject({
          studentLesson: new LiveObject(pageCoreContext.studentLesson),
        }),
        events: new LiveList([]),
      })}
    >
      <PageProvider {...pageCoreContext}>
        <StudentLessonComponent liveBlockRoomId={params.liveBlockId || liveBlockRoomId || ''} />
      </PageProvider>
    </RoomProvider>
  );
};
