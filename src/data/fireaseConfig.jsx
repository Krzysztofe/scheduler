// import { FirebaseApp, initializeApp } from "firebase/app";
// import { Auth, getAuth } from "firebase/auth";
// import { Database, getDatabase } from "firebase/database";

// const firebaseConfig = {
//   apiKey: "AIzaSyA7QqpEIN0NSmTdg2O0DD1Ub61BP9hIlNk",
//   authDomain: "scheduler-26249.firebaseapp.com",
//   projectId: "scheduler-26249",
//   storageBucket: "scheduler-26249.appspot.com",
//   messagingSenderId: "960551257360",
//   appId: "1:960551257360:web:7cbde251edf8cc3c3c5195",
// };

// class FirebaseSingleton {
//   app = null;

//   static instance = null;

//   constructor() {
//     this.initializeApp();
//   }

//   initializeApp() {
//     this.app = initializeApp(firebaseConfig);
//     this.auth = getAuth(this.app);
//     this.database = getDatabase(this.app);
//   }

//   static getInstance() {
//     if (!FirebaseSingleton.instance) {
//       FirebaseSingleton.instance = new FirebaseSingleton();
//     }
//     return FirebaseSingleton.instance;
//   }
// }

// export default FirebaseSingleton;

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  // apiKey: "AIzaSyA7QqpEIN0NSmTdg2O0DD1Ub61BP9hIlNk",
  // authDomain: "scheduler-26249.firebaseapp.com",
  // // databaseURL:
  // //   "https://godziny-7a52b-default-rtdb.europe-west1.firebasedatabase.app/",
  // projectId: "scheduler-26249",
  // storageBucket: "scheduler-26249.appspot.com",
  // messagingSenderId: "960551257360",
  // appId: "1:960551257360:web:7cbde251edf8cc3c3c5195",

  apiKey: "AIzaSyAfgq4E10mlJix8lPe6Jvfye2FTedHa0QU",
  authDomain: "authentication-cl.firebaseapp.com",
  projectId: "authentication-cl",
  storageBucket: "authentication-cl.appspot.com",
  messagingSenderId: "782250818177",
  appId: "1:782250818177:web:2a7a5ef2b603b9fbc7ab80",
  measurementId: "G-VXD7D7151F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const firestore = getFirestore(app);
