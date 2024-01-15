import { DataLayerInput } from '../../context/TagContext';
import { GTMEvent, GTMEvents } from '../GMTEvents';
import { onHold10sToPushDataLayer, pushDataLayer } from './pushDataLayer';

export const getEventDataConsumer = () => {
  return ({ event, data }: DataLayerInput) => {
    let prepareData: GTMEvent | undefined;

    switch (event) {
      case 'QUIZ':
        prepareData = GTMEvents.QUIZ(data);
        break;
      case 'EDITOR':
        prepareData = GTMEvents.EDITOR(data);
        break;
      case 'LIVE_SUPPORT':
        prepareData = GTMEvents.LIVE_SUPPORT(data);
        break;
      case 'PICTURE_AND_TEXT':
        prepareData = GTMEvents.PICTURE_AND_TEXT(data.content);
        if (data.imageRef) {
          onHold10sToPushDataLayer(prepareData, data.imageRef, null);
          return;
        }
        break;
      case 'ON_VIDEO':
        prepareData = GTMEvents.ON_VIDEO(data.content);
        if (data.imageRef) {
          onHold10sToPushDataLayer(prepareData, null, data.videoRef);
          return;
        }
        break;
      case 'LEARN':
        prepareData = GTMEvents.LEARN(data);
        break;
      default:
        if (data) {
          prepareData = {
            event: '',
            data,
          };
        }
    }

    if (prepareData) {
      pushDataLayer(prepareData);
    }
  };
};
