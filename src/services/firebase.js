import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  updateDoc,
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

export async function getSuggestedUsers(uid, following, limitNum = 5) {
  let q;

  q = query(
    collection(db, "users"),
    where("uid", "not-in", [uid, ...following]),
    limit(limitNum)
  );

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => {
    const { fullName, username } = doc.data();
    return { fullName, username };
  });
}

export async function addPost(post) {
  await addDoc(collection(db, "posts"), post);
}

export async function getFollowingPosts({ uid, following }) {
  const q = query(
    collection(db, "posts"),
    where("uid", "in", [uid, ...following])
  );

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => {
    const postId = doc.id;
    return { postId, ...doc.data() };
  });
}

export async function addComment({ postId, username, comment }) {
  const postRef = doc(db, "posts", postId);

  return updateDoc(postRef, {
    comments: arrayUnion({ comment, username }),
  });
}

export async function getPostByPostId(postId) {
  const postRef = doc(db, "posts", postId);
  const snapshot = await getDoc(postRef);
  return snapshot.data();
}

export async function likePost(uid, postId) {
  const postRef = doc(db, "posts", postId);

  return updateDoc(postRef, {
    likes: arrayUnion(uid),
  });
}

export async function unlikePost(uid, postId) {
  const postRef = doc(db, "posts", postId);

  return updateDoc(postRef, {
    likes: arrayRemove(uid),
  });
}
