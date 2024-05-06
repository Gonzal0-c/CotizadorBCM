// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAneRsFb7gyivJIi7_H6nl2Wb16SN7Q_4I",
  authDomain: "cotizadorbcm-7696c.firebaseapp.com",
  projectId: "cotizadorbcm-7696c",
  storageBucket: "cotizadorbcm-7696c.appspot.com",
  messagingSenderId: "699313977235",
  appId: "1:699313977235:web:92e9ec9b363b808938da66",
  measurementId: "G-CTKKTT697M",
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

export default appFirebase;
export { appFirebase };
