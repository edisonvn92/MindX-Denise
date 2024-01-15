import React from 'react';
import { useCoreContext } from '@/core';
import { LiveBlockRoomScreen } from '@/modules/liveblock-room/screens/LiveBlockRoomScreen';
import { SupportStatusEnum } from '@/modules/support/helper/SupportStatusEnum';

export const SupportEditorScreen: React.FC = () => {
  const { liveBlockRoomId, supportStatus } = useCoreContext();

  return liveBlockRoomId && supportStatus === SupportStatusEnum.Started ? (
    <div className="w-full h-full rounded-xl relative">
      <LiveBlockRoomScreen liveBlockRoomId={liveBlockRoomId} />
    </div>
  ) : (
    <div />
  );
};
