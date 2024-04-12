import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {getFirestore, collection} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnlgqRNqIiI2sIfMq5-14cyny8Bx_VAx0",
  authDomain: "reactnativelogin-da7d1.firebaseapp.com",
  projectId: "reactnativelogin-da7d1",
  storageBucket: "reactnativelogin-da7d1.appspot.com",
  messagingSenderId: "303509760413",
  appId: "1:303509760413:web:a49cd18e9e06e3716ce774"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth =  initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const dailyRef = collection(db, 'dailys')

