import FirebaseSingleton from "../data/firebaseSingleton";

const firebaseConfig = () => {
  const firebaseInstance = FirebaseSingleton.getInstance();
  const db = firebaseInstance.db;
  const firestore = firebaseInstance.firestore;

  return { db, firestore };
};

export default firebaseConfig;
