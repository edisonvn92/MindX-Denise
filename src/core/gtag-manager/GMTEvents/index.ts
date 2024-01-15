import { pushEditorData } from './pushEditorData';
import { pushLeanrnSessionDate } from './pushLeanrnSessionDate';
import { pushLiveSupportData } from './pushLiveSupportData';
import { pushOnVideoData } from './pushOnVideoData';
import { pushPictureAndTextData } from './pushPictureAndTextData';
import { pushQuizData } from './pushQuizData';

export type GTMEvent = {
  event: string;
  data?: Record<string, unknown>;
  _clear?: boolean;
};

export const GTMEvents = {
  QUIZ: pushQuizData,
  EDITOR: pushEditorData,
  LIVE_SUPPORT: pushLiveSupportData,
  PICTURE_AND_TEXT: pushPictureAndTextData,
  ON_VIDEO: pushOnVideoData,
  LEARN: pushLeanrnSessionDate,
};
