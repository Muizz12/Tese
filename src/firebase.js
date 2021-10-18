// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDOi8sWXvzgOW9LWU27EzvdRhiivITmTnY",
  authDomain: "clone-35aca.firebaseapp.com",
  projectId: "clone-35aca",
  storageBucket: "clone-35aca.appspot.com",
  messagingSenderId: "1018487497427",
  appId: "1:1018487497427:web:4ce39d3338acf171bdea26",
  measurementId: "G-KBSKVZKGD3",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
export { db, auth };
