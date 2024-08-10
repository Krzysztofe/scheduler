import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import firebaseConfig from "../utils/firebaseConfig";

const performFirestoreOperation = async (
  operation,
  collectionName,
  docId = null,
  data = null
) => {
  const { firestore } = firebaseConfig();
  const collectionRef = collection(firestore, collectionName);

  try {
    switch (operation) {
      case "POST":
        if (!data) throw new Error("Data is required for POST operation.");
         await addDoc(collectionRef, data);
        // return { success: true, id: postDocRef.id };

      case "PUT":
        if (!docId || !data)
          throw new Error(
            "Document ID and data are required for PUT operation."
          );
        const putDocRef = doc(firestore, collectionName, docId);
        await updateDoc(putDocRef, data);
        return {
          success: true,
          message: `Document with ID ${docId} updated successfully.`,
        };

      case "DELETE":
        if (!docId)
          throw new Error("Document ID is required for DELETE operation.");
        const deleteDocRef = doc(firestore, collectionName, docId);
        await deleteDoc(deleteDocRef);
        return {
          success: true,
          message: `Document with ID ${docId} deleted successfully.`,
        };

      default:
        throw new Error("Invalid operation. Use 'POST', 'PUT', or 'DELETE'.");
    }
  } catch (error) {
    console.error("Error performing Firestore operation:", error);
    return { success: false, error: error.message };
  }
};

export default performFirestoreOperation;
