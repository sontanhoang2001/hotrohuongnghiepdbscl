import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = initializeApp({
  apiKey: 'AIzaSyAPEVvcfH7fh8CXwf1R2Kp5Yo1oOeGafME',
  authDomain: 'upload-file-5908d.firebaseapp.com',
  projectId: 'upload-file-5908d',
  storageBucket: 'upload-file-5908d.appspot.com',
  messagingSenderId: '24984766742',
  appId: '1:24984766742:web:ecfb9ea9c7ee2797d76837',
});

// Firebase storage reference
const storage = getStorage(firebaseConfig);
export default storage;
