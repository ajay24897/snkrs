// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDhgg-6Nh0XDRUazAISM8G_rQ-fECpS3E",
  authDomain: "snkrs-4635a.firebaseapp.com",
  projectId: "snkrs-4635a",
  storageBucket: "snkrs-4635a.appspot.com",
  messagingSenderId: "706340446769",
  appId: "1:706340446769:web:22b459f637cb97076e2b10",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
