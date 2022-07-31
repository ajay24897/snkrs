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
const womensSnkrs = collection(db, "womens-snkrs");
const unisexSnkrs = collection(db, "unisex-snkrs");

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

export const womensApi = {
  addSnkr: (snkr) => addDoc(womensSnkrs, snkr),
  getAllSnkrs: () => getDocs(womensSnkrs),
  getSnkrs: async () =>
    getDocs(
      query(
        womensSnkrs,
        where("title", "==", "adidas Gazelle Vintage Satta size? Exclusive"),
        limit(2)
      )
    ),
  deleteSnkr: (id) => {
    const snkr = doc(db, "womens-snkrs", id);
    return deleteDoc(snkr);
  },
  getSnkr: (id) => {
    const snkr = doc(db, "womens-snkrs", id);
    return getDoc(snkr);
  },
  getAllBrandSnkrs: async (brand) =>
    getDocs(query(womensSnkrs, where("brand", "==", brand))),
  getPaginatedSnkrs: async (d) =>
    getDocs(query(womensSnkrs, orderBy("id"), startAfter(d), limit(12))),
};

export const unisexApi = {
  addSnkr: (snkr) => addDoc(unisexSnkrs, snkr),
  getAllSnkrs: () => getDocs(unisexSnkrs),
  getSnkrs: async () =>
    getDocs(
      query(
        unisexSnkrs,
        where("title", "==", "adidas Gazelle Vintage Satta size? Exclusive"),
        limit(2)
      )
    ),
  deleteSnkr: (id) => {
    const snkr = doc(db, "unisex-snkrs", id);
    return deleteDoc(snkr);
  },
  getSnkr: (id) => {
    const snkr = doc(db, "unisex-snkrs", id);
    return getDoc(snkr);
  },
  getAllBrandSnkrs: async (brand) =>
    getDocs(query(unisexSnkrs, where("brand", "==", brand))),
  getPaginatedSnkrs: async (d) =>
    getDocs(query(unisexSnkrs, orderBy("id"), startAfter(d), limit(12))),
};

export const cartApi = {
  addSnkr: (snkr) => addDoc(cart, snkr),
  deleteSnkr: (snkrId) => {
    const snkr = doc(db, "cart", snkrId);
    return deleteDoc(snkr);
  },
  getSnkr: async (email) => {
    if (email) {
      return await getDocs(query(cart, where("user", "==", email)));
    }
  },
};
