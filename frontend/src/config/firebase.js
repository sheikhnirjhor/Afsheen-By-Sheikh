import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "demo-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "afsheen-by-sheikh.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "afsheen-by-sheikh",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "afsheen-by-sheikh.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "000000000000",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:000000000000:web:000000000000"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;
