import { getEventDataConsumer } from '../utils/getEventDataConsumer';
import getInitScriptContent from '../utils/getInitScriptContent';
import { DataLayerAction, DataLayerInput } from '@/core/context/TagContext';
import { config } from '@/config';

export const useGTM = () => {
  const tagManagerArgs = config.google.ggTagManagerId;
  const { initScript, noScript } = getInitScriptContent(tagManagerArgs);
  const eventDataConsumer = getEventDataConsumer();

  const handleDataLayerAction: DataLayerAction = (action: DataLayerInput) => {
    eventDataConsumer(action);
  };
  return {
    gtmHandler: handleDataLayerAction,
    initScript,
    noScript,
  };
};
