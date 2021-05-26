import firebase from "firebase/app"

let firebaseConfig = {
    apiKey: "AIzaSyAcRnfYMZFyF5mPp7ZuLLYybwt3-C-pPz0",
    authDomain: "tptestfront.firebaseapp.com",
    projectId: "tptestfront",
    storageBucket: "tptestfront.appspot.com",
    messagingSenderId: "793946446619",
    appId: "1:793946446619:web:6e5589b6b185067a7691be"
  };

export default firebase.initializeApp(firebaseConfig);
