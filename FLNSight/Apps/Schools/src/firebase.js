// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBu_dC3YU0uAU9rAKJHwlW-7NKzk3Onud0",
  authDomain: "firecmsdemo.firebaseapp.com",
  databaseURL: "https://firecmsdemo.firebaseio.com",
  projectId: "firecmsdemo",
  storageBucket: "firecmsdemo.appspot.com",
  messagingSenderId: "401778247379",
  appId: "1:401778247379:web:861d0336956317e8dc3626",
  measurementId: "G-JE99PSF6YV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
 export {app, analytics, auth};