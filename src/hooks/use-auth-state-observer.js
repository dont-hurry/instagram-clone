import { useState, useEffect } from "react";
import * as AUTH_STATUS from "../constants/auth-status";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function useAuthStateObserver() {
  const [authState, setAuthState] = useState({
    status: AUTH_STATUS.WAITING,
    uid: null,
  });

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // We don't read user information from Firestore right here because this
        // code may run before writing data to Firestore when signing up
        setAuthState({ status: AUTH_STATUS.LOGGED_IN, uid: user.uid });
      } else {
        setAuthState({ status: AUTH_STATUS.NOT_LOGGED_IN, uid: null });
      }
    });
  }, []);

  return authState;
}
