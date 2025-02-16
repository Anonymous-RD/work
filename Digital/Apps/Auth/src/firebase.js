// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0VF-bETzKetQDpTrNUBQRXuu0MbPAm3w",
  authDomain: "styletrends-5dc20.firebaseapp.com",
  databaseURL: "https://styletrends-5dc20-default-rtdb.firebaseio.com",
  projectId: "styletrends-5dc20",
  storageBucket: "styletrends-5dc20.appspot.com",
  messagingSenderId: "344089210069",
  appId: "1:344089210069:web:aae6e49ad28302cf70865c",
  measurementId: "G-QH4ZJZPDEN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
 export {app, analytics, auth};