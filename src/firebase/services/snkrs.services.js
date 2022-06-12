import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  limit,
  where,
} from "firebase/firestore/lite";
import { db } from "../firebase-config";

// https://firebase.google.com/docs/firestore/manage-data/add-data

const mensSnkrs = collection(db, "mens-snkrs");

let mensApi = {
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
  getAllBrandSnkrs: async (brand) =>
    getDocs(query(mensSnkrs, where("brand", "==", brand))),
};

export default mensApi;
