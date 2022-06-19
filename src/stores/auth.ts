import { defineStore } from "pinia";
import app from "../firebase";
import { getFirestore, serverTimestamp } from "firebase/firestore";

import {
  doc,
  updateDoc,
  setDoc,
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";

const auth = getAuth();
const db = getFirestore();

const unsub = await onAuthStateChanged(auth, async (user) => {
  const authStore = useAuthStore();
  if (user) {
    // debugger
    const q = query(
      collection(db, "companies"),
      where("companyEmail", "==", user.email)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      const q = query(
        collection(db, "companies"),
        where("companyEmail", "==", user.email)
      );
    } else {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        authStore.name = doc.data().companyName;
        authStore.email = doc.data().companyEmail;
        authStore.img = doc.data().companyImage;
        authStore.password = doc.data().companyPassword;
        authStore.type = "companies";
        authStore.isLogin = true;
      });
    }
  }
  authStore.isloaded = true;
  unsub();
});

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    isloaded: false,
    isLogin: false,
    name: "",
    email: "",
    password: "",
    type: "",
    company: "",
    img: "",
  }),
  getters: {},
  actions: {},
});
