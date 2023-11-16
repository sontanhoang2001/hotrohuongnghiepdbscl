// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';

import {
  getAuth,
  onAuthStateChanged,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCGUr5cPEUAx1JjMCNPGMdcqU7LXZuHWJk',
  authDomain: 'hotrohuongnghiepdbscl.firebaseapp.com',
  projectId: 'hotrohuongnghiepdbscl',
  storageBucket: 'hotrohuongnghiepdbscl.appspot.com',
  messagingSenderId: '528105090519',
  appId: '1:528105090519:web:042cde1d1a66de043f6f92',
  measurementId: 'G-JRZPCLX2V5',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);

const googleSignIn = () => {
  try {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  } catch (error) {
    console.log(error);
  }
};

const facebookSignIn = () => {
  try {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider);
  } catch (error) {
    console.log(error);
  }
};
// <======= END LOGIN  =======>

const logOut = () => {
  try {
    signOut(auth);
  } catch (error) {
    console.log(error);
  }
};

export { auth, onAuthStateChanged, RecaptchaVerifier, signInWithPhoneNumber, googleSignIn, facebookSignIn, logOut };
