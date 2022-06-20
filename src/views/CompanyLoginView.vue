<template>
  <div class="hero min-h-screen">
    <div class="hero-content flex-col">
      <div class="text-center lg:text-right mb-10 text-blue-500">
        <h1 class="text-5xl font-bold">تسجيل الدخول كشركه</h1>
      </div>
      <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div class="card-body">
          <div class="form-control">
            <label class="label">
              <span class="label-text">البريد الإلكترونى</span>
            </label>
            <input
              type="text"
              placeholder="email"
              class="input input-bordered"
              v-model="email"
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">كلمه المرور</span>
            </label>
            <input
              type="text"
              placeholder="password"
              class="input input-bordered"
              v-model="password"
            />
          </div>
          <div class="form-control mt-6">
            <button class="btn btn-primary" @click="login">تسجيل الدخول</button>
            <router-link
              to="/company-register"
              class="mt-3 link text-indigo-600"
              >عمل حساب جديد</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";
import app from "@/firebase";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const store = useAuthStore();
const auth = getAuth();
const db = getFirestore();
const router = useRouter();

const email = ref("admin@cmoney.com");
const password = ref("admin@cmoney.com");

function login() {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(async () => {
      const q = query(
        collection(db, "companies"),
        where("companyEmail", "==", email.value)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        store.id = doc.id;
        store.name = doc.data().companyName;
        store.email = email.value;
        store.img = doc.data().companyImage;
        store.password = password.value;
        store.percentage = doc.data().companyPercentage;
        store.phone = doc.data().companyPhone;
        store.isLogin = true;
        store.type = "companies";
      });
      createToast("تم تسجيل الدخول .", {
        transition: "bounce",
        type: "success",
      });
      email.value = "";
      password.value = "";
      router.push("/");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode == "auth/user-not-found") {
        createToast("المستخدم غير موجود.", {
          transition: "bounce",
          type: "danger",
        });
      } else if (errorCode == "auth/wrong-password") {
        createToast("كلمه المرور خطاْ.", {
          transition: "bounce",
          type: "danger",
        });
      } else {
        createToast(error.code, {
          transition: "bounce",
          type: "danger",
        });
        createToast(error.message, {
          transition: "bounce",
          type: "danger",
        });
      }
    });
}
</script>

<style scoped>
.hero {
  background-image: url("../assets/images/jason-leung-SAYzxuS1O3M-unsplash.jpg");
}
.hero-content {
  background: #ffffffd4;
  padding: 50px;
  border-radius: 5px;
}
</style>
