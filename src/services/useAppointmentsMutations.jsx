import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import firebaseConfig from "../utils/firebaseConfig";
import { useContext } from "react";
import { ContextCalendar } from "../pages/calendar/calendarPanel/ContextCalendarProv";

const useAppointmentsMutations = () => {
  const { setIsLoadingAction, setErrorAction } = useContext(ContextCalendar);

  const performMutation = async (
    operation,
    collectionName,
    docId = null,
    data = null
  ) => {
    const { firestore, db } = firebaseConfig();
    const collectionRef = collection(firestore, collectionName);

    try {
      setIsLoadingAction(true);
      switch (operation) {
        case "POST":
          if (!data) return;
          await addDoc(collectionRef, data);
          setIsLoadingAction(false);
          break;
        case "PUT":
          if (!docId || !data) return;
          const putDocRef = doc(db, collectionName, docId);
          await updateDoc(putDocRef, data);
          setIsLoadingAction(false);
          break;
        case "DELETE":
          if (!docId) return;
          const deleteDocRef = doc(db, collectionName, docId);
          await deleteDoc(deleteDocRef);
          setIsLoadingAction(false);
          break;
      }
    } catch (error) {
      setErrorAction("Błąd. Ponów prubę.");
    } finally {
      setIsLoadingAction(false);
    }
  };

  return { performMutation };
};

export default useAppointmentsMutations;
