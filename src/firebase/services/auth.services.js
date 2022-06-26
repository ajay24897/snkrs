import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase-config";
export const Auth = {
  createUser: (email, password) =>
    createUserWithEmailAndPassword(auth, email, password),
  signIn: (email, password) =>
    signInWithEmailAndPassword(auth, email, password),
  signOut: () => signOut(auth),
};
