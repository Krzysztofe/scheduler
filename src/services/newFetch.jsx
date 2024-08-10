import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import firebaseConfig from "../utils/firebaseConfig";
import { useState } from "react";

const usePerformFirestoreOperation = async (
  // setError,
  operation,
  collectionName,
  docId = null,
  data = null
) => {
  // const [requestError, setRequestError] = useState(null);
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

      default:
        return {
          errorMsg: "Invalid operation. Use 'POST', 'PUT', or 'DELETE'.",
        };
    }
  } catch (error) {
    console.log("cc", error);
    errorMsg = error;
  }
  return { errorMsg };
};

export default usePerformFirestoreOperation;
