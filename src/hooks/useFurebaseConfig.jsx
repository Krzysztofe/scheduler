import FirebaseSingleton from "../data/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

const useFirebaseConfig = () => {
  const firebaseInstance = FirebaseSingleton.getInstance();
  const auth = firebaseInstance.auth;
//   const [user] = useAuthState(auth!);

  return { firebaseInstance, auth, user };
};

export default useFirebaseConfig;