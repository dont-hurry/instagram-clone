import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import config from "./firebase-config"; // This file is not uploaded to GitHub

initializeApp(config);

export const auth = getAuth();

export const db = getFirestore();
