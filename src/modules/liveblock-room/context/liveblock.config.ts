import { createRoomContext } from '@liveblocks/react';
import { createClient, LiveList, LiveObject } from '@liveblocks/client';
import { config } from '@/config';

const client = createClient({
  publicApiKey: config.liveBlock.publicApiKey,
  throttle: 30,
});

type Presence = {
  cursor: { x: number; y: number } | null;
  // ...
};

// Optionally, Storage represents the shared document that persists in the
// Room, even after all Users leave. Fields under Storage typically are
// LiveList, LiveMap, LiveObject instances, for which updates are
// automatically persisted and synced to all connected clients.
type Storage = {
  // animals: LiveList<string>,
  // ...
  scratchGui: LiveObject<{
    data?: string;
    running?: boolean;
    tabId?: number;
    xml: string;
    lastId?: string;
  }>;
  pageData: LiveObject<{
    studentLesson: LiveObject<{
      learningProgresses: LiveList<any>;
      status: string;
    }>;
  }>;
  events: LiveList<{
    id: string;
    data: { [k: string]: any };
    timestamp: number;
  }>;
};

export const {
  RoomProvider,
  useMyPresence,
  useObject,
  useMutation,
  useStorage,
  useBroadcastEvent,
  useEventListener,
  useRoom,
  useOthers,
  useMap,
  useSelf,
  useStatus,
} = createRoomContext<Presence, Storage /* UserMeta, RoomEvent */>(client);
