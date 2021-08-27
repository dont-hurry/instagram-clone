import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  getFirestore,
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore/lite";
import config from "./firebase-config"; // This file is not uploaded to GitHub

initializeApp(config);
const auth = getAuth();
const db = getFirestore();

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
