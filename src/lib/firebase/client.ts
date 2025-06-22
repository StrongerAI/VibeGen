'use client';

import { initializeApp, getApp, getApps } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Validate environment variables
const missingVars = Object.entries(firebaseConfig)
  .filter(([, value]) => !value || value === 'undefined') // Also check for the string 'undefined'
  .map(([key]) => key);

if (missingVars.length > 0) {
  console.warn(`Missing or invalid Firebase environment variables: ${missingVars.join(', ')}. Firebase features will be disabled.`);
}

// Initialize Firebase only if config is valid
const app = missingVars.length === 0 && getApps().length === 0 ? initializeApp(firebaseConfig) : (getApps().length > 0 ? getApp() : null);

export { app };
