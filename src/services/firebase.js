import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
  getDocs,
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
