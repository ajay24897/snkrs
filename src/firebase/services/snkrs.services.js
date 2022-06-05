import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore/lite";
import { db } from "../firebase-config";

// https://firebase.google.com/docs/firestore/manage-data/add-data

const mensSnkrs = collection(db, "mens-snkrs");

let mensApi = {
  addSnkr: (snkr) => addDoc(mensSnkrs, snkr),
  getAllSnkrs: () => getDocs(mensSnkrs),
};

export default mensApi;
