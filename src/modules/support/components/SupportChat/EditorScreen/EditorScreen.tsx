import React from 'react';
import { Layout } from 'antd';
import { EditorToolFooter } from './EditorToolFooter/EditorToolFooter';
import { SupportEditorScreen } from './SupportEditorScreen/SupportEditorScreen';

interface EditorScreenProps {
  mainScreen?: React.ReactNode;
  isSupported?: boolean;
  setIsEndDialogOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditorScreen: React.FC<EditorScreenProps> = (props: EditorScreenProps) => {
  const { mainScreen, isSupported, setIsEndDialogOpened } = props;
  return (
    <Layout className="bg-mx-gray-50 h-screen">
      {isSupported ? (
        <div className="bg-mx-gray-50 rounded-xl border-mx-gray-200  border border-solid  m-4 h-full flex flex-wrap grow">
          {mainScreen || <SupportEditorScreen />}
        </div>
      ) : (
        mainScreen || <SupportEditorScreen />
      )}
      {isSupported ? (
        <EditorToolFooter
          setIsEndDialogOpened={setIsEndDialogOpened}
          isStudent={Boolean(mainScreen)}
        />
      ) : undefined}
    </Layout>
  );
};
