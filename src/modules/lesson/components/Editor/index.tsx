import React, { Suspense, useMemo } from 'react';
import { useToast } from '@mx/ui';
import { config } from '@/config';
import { useCoreContext } from '@/core';

type EditorProps = {
  liveBlockRoomId: string;
};

const ScratchEditor = (props: EditorProps) => {
  const { liveBlockRoomId } = props;
  const { actionUpdateScratchState, isTeacher } = useCoreContext();

  const studentLessonId = liveBlockRoomId.split('-').pop();
  const toast = useToast();

  const EditorUI = useMemo(() => {
    return React.lazy(async () => {
      const { Editor, LiveBlocksProvider } = await import('@mx/denise-core');
      const Scratch = () => {
        const provider = useMemo(
          () =>
            new LiveBlocksProvider({
              roomId: liveBlockRoomId,
              publicApiKey: config.liveBlock.publicApiKey,
              onError: (error: any) => {
                toast.addToast({
                  status: 'error',
                  header: 'Lỗi',
                  description: error.message,
                  expiringTime: 20000,
                });
              },
            }),
          [],
        );
        return useMemo(() => {
          return (
            <Editor
              provider={provider}
              cursor
              teacher={!!isTeacher}
              onChange={(value: any) => {
                actionUpdateScratchState({
                  id: studentLessonId,
                  state: value,
                });
              }}
              projectPath={`current-scratch-state/${studentLessonId}`}
              onEvent={() => {}}
              projectHost={config.base.publicUrl}
            />
          );
        }, []);
      };

      return { default: Scratch };
    });
  }, []);
  return (
    <Suspense fallback={false}>
      <EditorUI />
    </Suspense>
  );
};

export default ScratchEditor;
