import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // New import
import { config } from '@/config';

const app = initializeApp(config.firebase);

export const auth = getAuth(app);
export default app;
