<template>
  <div class="navbar bg-base-100">
    <div class="container mx-auto">
      <div class="navbar-start">
        <router-link
          class="btn btn-outline btn-primary"
          to="/"
          v-if="authStore.isLogin"
          >بيانات الموظفين</router-link
        >
        <router-link
          class="btn btn-outline btn-primary"
          to="/"
          v-if="!authStore.isLogin"
          >تسجيل الدخول موظفين</router-link
        >
      </div>
      <div class="navbar-center flex justify-center">
        <router-link to="/"
          ><img
            src="@/assets/images/Manager-logos_transparent.png"
            alt="currency-exchange-manager"
            width="150"
        /></router-link>
      </div>
      <div class="navbar-end flex justify-end">
        <div class="dropdown dropdown-end" v-if="authStore.isLogin">
          <label tabindex="0" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img :src="authStore.img" />
            </div>
          </label>
          <ul
            tabindex="0"
            class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52 right-[-160px]"
          >
            <li>
              <router-link to="/"> {{ authStore.name }} </router-link>
            </li>
            <li><span @click="logout"> تسجيل الخروج </span></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { useAuthStore } from "@/stores/auth";
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();
const auth = getAuth();

function logout() {
  signOut(auth).then(() => {
    authStore.name = "";
    authStore.email = "";
    authStore.img = "";
    authStore.password = "";
    authStore.type = "";
    authStore.isLogin = false;
    createToast("تم تسجيل الخروج", {
      type: "success",
    });
    router.push("/");
  });
}
</script>

<style scoped>
.dropdown-end .dropdown-content {
  right: -175px !important;
}
</style>
