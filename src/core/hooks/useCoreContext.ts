import React, { useContext } from 'react';
import PageContext, { AppContext } from '../context/PageContext';
import { SocketContext } from '../context/SocketContext';

export const useCoreContext = () => {
  return useContext(PageContext);
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export const useSocketContext = () => {
  return useContext(SocketContext);
};
