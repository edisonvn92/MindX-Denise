/* eslint-disable react/jsx-no-constructed-context-values */
import React, { PropsWithChildren } from 'react';
import { InitScripts } from '../gtag-manager/InitScripts';

export type DataLayerInput = {
  event: string;
  data: Record<string, any>;
};

export type DataLayerAction = (data: DataLayerInput) => void;

type DataLayerProps = PropsWithChildren<any> & {
  handlers: Array<DataLayerAction>;
  scripts: string[];
};

export const TagContext = React.createContext({
  dataLayerAction: (data: DataLayerInput) => {
    console.log('Data layer not initialized');
  },
});
TagContext.displayName = 'TagContext';

export const TagContextInit = ({ handlers = [], scripts = [], children }: DataLayerProps) => {
  const dataLayerAction = (data: DataLayerInput) => {
    handlers.map((handler: DataLayerAction) => {
      return handler(data);
    });
  };

  return (
    <>
      <InitScripts scripts={scripts} />
      <TagContext.Provider value={{ dataLayerAction }}>{children}</TagContext.Provider>
    </>
  );
};

export const useDataLayerAction = (): DataLayerAction => {
  const { dataLayerAction } = React.useContext(TagContext);
  return dataLayerAction;
};
