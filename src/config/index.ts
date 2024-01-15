import { defaultsDeep } from 'lodash';
import { overrideConfig } from './override.config';

export interface Config {
  title: string;
  footer: {
    text: string;
  };
  firebase: {
    apiKey: string;
    authDomain: string;
    databaseURL: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
  };
  base: {
    webUrl: string;
    apiUrl: string;
    authenticateUrl: string;
    publicUrl: string;
    socketUrl: string;
  };
  google: {
    ggTagManagerId: string;
    ggAnalystId: string;
  };
  resources: {
    rootEndpoint: string;
    uploadEndpoint: string;
    imageEndpoint: string;
  };
  i18n: {
    VI: string;
    EN: string;
    defaultLang: string;
  };
  scratchEditorUrl: string;
  test?: {
    userLocalID: string;
    env: string;
    userPermission: string[];
  };
  screenCollapsedUrlList: string[];
  liveBlock: {
    publicApiKey: string;
  };
}

const defaultConfig: Config = {
  title: import.meta.env.VITE_APP_TITLE || 'MindX Technology School',
  footer: {
    text: import.meta.env.VITE_APP_FOOTER_TEXT || 'MindX Technology School 2022',
  },
  firebase: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyB-x8gFuVKzbIoB1aYKbG1jrvm8mbZUmkQ',
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'mindx-edu-dev.firebaseapp.com',
    databaseURL:
      import.meta.env.VITE_FIREBASE_DATABASE_URL || 'https://mindx-edu-dev.firebaseio.com',
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'mindx-edu-dev',
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'mindx-edu-dev.appspot.com',
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGE_SENDER_ID || '592744290445',
    appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:592744290445:web:aa82213d363f9b59c5eac4',
    measurementId: import.meta.env.VITE_FIREBASE_MESSAGE_SENDER_ID || 'G-QPEELWB8Q4',
  },
  base: {
    webUrl: import.meta.env.VITE_BASE_WEB_URL || 'https://base-dev.mindx.edu.vn',
    apiUrl: import.meta.env.VITE_BASE_API_URL || 'BASE_API_URL',
    authenticateUrl: 'https://base-api-dev.mindx.edu.vn',
    publicUrl: import.meta.env.VITE_PUBLIC_URL || 'https://denise-api-test.mindx.edu.vn/public',
    socketUrl: import.meta.env.VITE_SOCKET_URL || 'https://denise-api-test.mindx.edu.vn',
  },
  google: {
    ggTagManagerId: import.meta.env.VITE_GG_TAG_MANAGER_ID || 'GTM-WXHHG5D8',
    ggAnalystId: import.meta.env.VITE_GG_ANALYST_ID || 'G-GPZQXWZHNV',
  },
  resources: {
    rootEndpoint: 'https://resources.mindx.edu.vn',
    uploadEndpoint: 'https://resources.mindx.edu.vn/api/v1/resources',
    imageEndpoint: 'https://resources.mindx.edu.vn/uploads/images',
  },
  scratchEditorUrl: '/editor',
  i18n: {
    VI: 'vi',
    EN: 'en',
    defaultLang: 'vi',
  },
  screenCollapsedUrlList: [
    'lesson',
    'student-lesson',
    'students',
    'student-editor',
    'student-request-support',
    'support-chat',
    'liveblock-room',
  ],
  liveBlock: {
    publicApiKey: 'pk_prod_wSGRoJTM-JDqCdlzKftc3-NDiQklx-c8RMkLEnQXDlXwtjY4Ijj7fbFt0N3rkDoZ',
  },
};

export const config = defaultsDeep(overrideConfig, defaultConfig) as Config;
export * from './permission';
