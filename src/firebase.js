import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBfI4077DqFROAqdK8lM5CjVunpH7sIy-U",
  authDomain: "instagram-clone-fcf26.firebaseapp.com",
  databaseURL: "https://instagram-clone-fcf26-default-rtdb.firebaseio.com/",
  projectId: "instagram-clone-fcf26",
  storageBucket: "instagram-clone-fcf26.appspot.com",
  messagingSenderId: "952706452123",
  appId: "1:952706452123:web:c053acc72af16699b5d43e",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
