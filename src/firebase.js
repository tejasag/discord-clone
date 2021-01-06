import firebase from "firebase";

const firebaseConfig = {
  apiKey: "sucker",
  authDomain: "discord-clone-b7429.firebaseapp.com",
  databaseURL: "https://discord-clone-b7429.firebaseio.com",
  projectId: "discord-clone-b7429",
  storageBucket: "discord-clone-b7429.appspot.com",
  messagingSenderId: "608920677462",
  appId: "1:608920677462:web:fa111bd8b91164d07c1ff7",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
