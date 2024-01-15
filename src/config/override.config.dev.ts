import { Config } from '.';

export const overrideConfig: Partial<Config> = {
  firebase: {
    apiKey: 'AIzaSyB-x8gFuVKzbIoB1aYKbG1jrvm8mbZUmkQ',
    authDomain: 'mindx-edu-dev.firebaseapp.com',
    databaseURL: 'https://mindx-edu-dev.firebaseio.com',
    projectId: 'mindx-edu-dev',
    storageBucket: 'mindx-edu-dev.appspot.com',
    messagingSenderId: '592744290445',
    appId: '1:592744290445:web:aa82213d363f9b59c5eac4',
    measurementId: 'G-QPEELWB8Q4',
  },
  base: {
    webUrl: 'https://base-dev.mindx.edu.vn',
    apiUrl: 'https://gateway-staging.mindx.edu.vn/denise-api/graphql',
    authenticateUrl: 'https://base-api-dev.mindx.edu.vn',
    publicUrl: 'https://denise-api-test.mindx.edu.vn/public',
    socketUrl: 'wss://denise-api-test.mindx.edu.vn',
  },
  google: {
    ggTagManagerId: 'GTM-WXHHG5D8',
    ggAnalystId: 'G-GPZQXWZHNV',
  },
  resources: {
    rootEndpoint: 'https://resources-dev.mindx.edu.vn',
    uploadEndpoint: 'https://resources-dev.mindx.edu.vn/api/v1/resources',
    imageEndpoint: 'https://resources-dev.mindx.edu.vn/uploads/images',
  },
};
