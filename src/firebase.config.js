// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAgiIZnfmvXpfDcrRF2BK-iYtGn9emkklY',
  authDomain: 'house-marketplace-app-1d331.firebaseapp.com',
  projectId: 'house-marketplace-app-1d331',
  storageBucket: 'house-marketplace-app-1d331.appspot.com',
  messagingSenderId: '407683083699',
  appId: '1:407683083699:web:2d3f1d0e3622943c05efc6',
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
