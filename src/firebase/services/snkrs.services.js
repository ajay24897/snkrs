import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  limit,
  where,
  startAfter,
  orderBy,
  getDoc,
} from "firebase/firestore/lite";
import { db } from "../firebase-config";

// https://firebase.google.com/docs/firestore/manage-data/add-data

const mensSnkrs = collection(db, "mens-snkrs");
const cart = collection(db, "cart");

export const mensApi = {
  addSnkr: (snkr) => addDoc(mensSnkrs, snkr),
  getAllSnkrs: () => getDocs(mensSnkrs),
  getSnkrs: async () =>
    getDocs(
      query(
        mensSnkrs,
        where("title", "==", "adidas Gazelle Vintage Satta size? Exclusive"),
        limit(2)
      )
    ),
  deleteSnkr: (id) => {
    const snkr = doc(db, "mens-snkrs", id);
    return deleteDoc(snkr);
  },
  getSnkr: (id) => {
    const snkr = doc(db, "mens-snkrs", id);
    return getDoc(snkr);
  },
  getAllBrandSnkrs: async (brand) =>
    getDocs(query(mensSnkrs, where("brand", "==", brand))),
  getPaginatedSnkrs: async (d) =>
    getDocs(query(mensSnkrs, orderBy("id"), startAfter(d), limit(12))),
};

export const cartApi = {
  addSnkr: (snkr) => addDoc(cart, snkr),
  deleteSnkr: () => {},
  getSnkr: async (email) => {
    if (email) {
      return await getDocs(query(cart, where("user", "==", email)));
    }
  },
};
