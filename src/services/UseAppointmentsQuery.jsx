import { useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import firebaseConfig from "../utils/firebaseConfig";

export const useAppointmentsQuery = returnData => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { firestore } = firebaseConfig();

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const appointmentsReference = collection(firestore, "appointments");
      const data = await getDocs(appointmentsReference);
      returnData(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      setLoading(false);
    } catch (err) {
      setError("Błąd. Spróbuj ponownie");
    } finally {
      setLoading(false);
    }
  };

  return { fetchAppointments, loading, error };
};
