import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import firebaseConfig from "../utils/firebaseConfig";
import { useContext } from "react";
import { ContextLoading } from "../pages/calendar/calendarPanel/ContextLoadingProv";

const useAppointmentsMutations = () => {
  const { setIsLoadingAction } = useContext(ContextLoading);

  const performMutation = async (
    operation,
    collectionName,
    docId = null,
    data = null
  ) => {
    const { firestore, db } = firebaseConfig();
    const collectionRef = collection(firestore, collectionName);

    let errorMsg = null;

    try {
      setIsLoadingAction(true);
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
        default:
          throw new Error("Unsupported operation");
      }
    } catch (error) {
      errorMsg = "Błąd. Ponów prubę.";
    } finally {
      setIsLoadingAction(false);
    }

    return { errorMsg };
  };

  return { performMutation };
};

export default useAppointmentsMutations;
