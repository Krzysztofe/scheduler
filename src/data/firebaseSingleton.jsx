import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

class FirebaseSingleton {
  firebaseConfig = {
    apiKey: "AIzaSyAfgq4E10mlJix8lPe6Jvfye2FTedHa0QU",
    authDomain: "authentication-cl.firebaseapp.com",
    projectId: "authentication-cl",
    storageBucket: "authentication-cl.appspot.com",
    messagingSenderId: "782250818177",
    appId: "1:782250818177:web:2a7a5ef2b603b9fbc7ab80",
    measurementId: "G-VXD7D7151F",
  };
  static instance = null;

  constructor() {
    this.app = initializeApp(this.firebaseConfig);
    this.db = getFirestore(this.app);
    this.firestore = getFirestore(this.app);
  }

  static getInstance() {
    if (!FirebaseSingleton.instance) {
      FirebaseSingleton.instance = new FirebaseSingleton();
    }
    return FirebaseSingleton.instance;
  }
}

export default FirebaseSingleton;
