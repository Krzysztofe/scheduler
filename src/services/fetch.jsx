import {
  getDocs,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import firebaseConfig from "../utils/firebaseConfig";

export const fetchData = async () => {
  try {
    const { firestore } = firebaseConfig();
    const appointmentsReference = collection(firestore, "appointments");
    const data = await getDocs(appointmentsReference);
    const appointments = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    return appointments;
  } catch (error) {
    throw error;
  }
};

const firestoreOperations = async (
  operation,
  collectionName,
  docId = null,
  data = null
) => {
  try {
    const { firestore } = firebaseConfig();
    const collectionRef = collection(firestore, collectionName);

    switch (operation) {
      case "GET":
        const snapshot = await getDocs(collectionRef);
        return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

      case "POST":
        if (!data) throw new Error("Data is required for POST operation.");
        const docRef = await addDoc(collectionRef, data);
        console.log('yyyyyy',)
        return docRef.id;

      case "PUT":
        if (!docId || !data)
          throw new Error(
            "Document ID and data are required for PUT operation."
          );
        const updateDocRef = doc(firestore, collectionName, docId);
        await updateDoc(updateDocRef, data);
        return `Document with ID ${docId} updated successfully.`;

      case "DELETE":
        if (!docId)
          throw new Error("Document ID is required for DELETE operation.");
        const deleteDocRef = doc(firestore, collectionName, docId);
        await deleteDoc(deleteDocRef);
        return `Document with ID ${docId} deleted successfully.`;

      default:
        throw new Error(
          "Invalid operation. Use 'GET', 'POST', 'PUT', or 'DELETE'."
        );
    }
  } catch (error) {
    console.error("Error in Firestore operation:", error);
    throw error;
  }
};

export default firestoreOperations;
