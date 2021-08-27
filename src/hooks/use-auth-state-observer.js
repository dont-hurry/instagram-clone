import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function useAuthStateObserver() {
  const [uid, setUid] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // We don't extract user info here because this code may run before
        // writing data into Firestore when signing up
        setUid(user.uid);
      } else {
        setUid(null);
      }
    });
  }, []);

  return uid;
}
