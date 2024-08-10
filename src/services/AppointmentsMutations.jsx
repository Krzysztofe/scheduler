import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import firebaseConfig from "../utils/firebaseConfig";

const AppointmentsMutations = async (
  operation,
  collectionName,
  docId = null,
  data = null
) => {
  const { firestore, db } = firebaseConfig();
  const collectionRef = collection(firestore, collectionName);

  let errorMsg = null;

  try {
    switch (operation) {
      case "POST":
        if (!data) return;
        await addDoc(collectionRef, data);
        break;
      case "PUT":
        if (!docId || !data) return;
        const putDocRef = doc(db, collectionName, docId);
        await updateDoc(putDocRef, data);
        break;

      case "DELETE":
        if (!docId) return;
        const deleteDocRef = doc(db, collectionName, docId);
        await deleteDoc(deleteDocRef);
        break;
    }
  } catch (error) {
    errorMsg = "Błąd. Ponów prubę.";
  }
  return { errorMsg };
};

export default AppointmentsMutations;
