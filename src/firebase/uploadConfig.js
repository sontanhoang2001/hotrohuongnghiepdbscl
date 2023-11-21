import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

const firebaseConfig = initializeApp({
  apiKey: 'AIzaSyAPEVvcfH7fh8CXwf1R2Kp5Yo1oOeGafME',
  authDomain: 'upload-file-5908d.firebaseapp.com',
  projectId: 'upload-file-5908d',
  storageBucket: 'upload-file-5908d.appspot.com',
  messagingSenderId: '24984766742',
  appId: '1:24984766742:web:ecfb9ea9c7ee2797d76837',
},"app2");

export const uploadFile = async (file) => {
  try {
    // Create a storage reference with a unique name
    const storageRef = ref(storage, `uploads/${file.name}`);

    // Upload file
    await uploadBytes(storageRef, file);

    // Get download URL
    const downloadURL = await getDownloadURL(storageRef);

    console.log('File uploaded successfully!');
    console.log('Download URL:', downloadURL);

    // Optionally, return the download URL
    return downloadURL;
  } catch (error) {
    console.error('Error uploading file:', error.message);
    // Optionally, rethrow the error or handle it as needed
    throw error;
  }
};

// Firebase storage reference
const storage = getStorage(firebaseConfig);
export default storage;
