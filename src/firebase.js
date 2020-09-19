import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDwrUh7jPPTZdaaSQe2Bb_0C9AfahzYn-Q",
  authDomain: "clone-d6262.firebaseapp.com",
  databaseURL: "https://clone-d6262.firebaseio.com",
  projectId: "clone-d6262",
  storageBucket: "clone-d6262.appspot.com",
  messagingSenderId: "1094906489361",
  appId: "1:1094906489361:web:66106165502c187285dfb0",
  measurementId: "G-Q72G9RS6ER",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

export { db, auth };
