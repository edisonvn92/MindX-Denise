import React from 'react';

const PageContext = React.createContext({} as any);
export const AppContext = React.createContext({} as any);

export const PageProvider = (props: any) => {
  const { children } = props;
  return <PageContext.Provider value={props}>{children}</PageContext.Provider>;
};

export const AppData = (props: any) => {
  const { children } = props;
  return <AppContext.Provider value={props}>{children}</AppContext.Provider>;
};

export default PageContext;
