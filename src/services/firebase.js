import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore/lite";
import { auth, db } from "../lib/firebase";

export async function doesUsernameExist(username) {
  const q = query(collection(db, "users"), where("username", "==", username));
  const querySnapshot = await getDocs(q);
  return querySnapshot.size > 0;
}

export async function handleSignUp({ email, fullName, username, password }) {
  // Firebase - Auth
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  const uid = userCredential.user.uid;

  // Firebase - Firestore
  await addDoc(collection(db, "users"), {
    uid,
    fullName,
    username: username.toLowerCase(),
    bio: "",
    email,
    followers: [],
    following: [],
  });
}

export async function handleLogIn({ email, password }) {
  await signInWithEmailAndPassword(auth, email, password);
}

export async function handleSignOut() {
  await signOut(auth);
}

export async function getUserInfoByUid(uid) {
  const q = query(collection(db, "users"), where("uid", "==", uid));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs[0].data();
}

export async function getSuggestedUsers(uid, following) {
  let q;

  if (following.length > 0) {
    q = query(
      collection(db, "users"),
      where("uid", "not-in", [uid, ...following]),
      limit(5)
    );
  } else {
    q = query(collection(db, "users"), where("uid", "!=", uid), limit(5));
  }

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => {
    const { fullName, username } = doc.data();
    return { fullName, username };
  });
}
