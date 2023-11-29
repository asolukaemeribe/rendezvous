// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_gkqKPMP2-wdeQLWBDiwyH6qffMn8e8k",
  authDomain: "reactnativetest-662df.firebaseapp.com",
  projectId: "reactnativetest-662df",
  storageBucket: "reactnativetest-662df.appspot.com",
  messagingSenderId: "1091094787118",
  appId: "1:1091094787118:web:712a2d3b608729a5c5dbbf"
};

// initialize Firebase App
const FIREBASE_APP = initializeApp(firebaseConfig);
// initialize Firebase Auth for that app immediately
initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// Initialize Firebase
export { FIREBASE_APP };
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);