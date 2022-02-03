<template>
  <nav>
    <div class="container mx-auto">
      <div class="flex justify-between w-full p-3">
        <router-link to="/" class="logo">
          <img
            src="https://www.who.int/images/default-source/eios-gtm-photos/who-ar-c-h.png?sfvrsn=1f8bd18b_1"
            alt="App Logo"
            class="w-48"
          />
        </router-link>
        <div class="nav-link flex w-full justify-end items-center">
          <router-link
            to="EmployeeLogin"
            class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:to-cyan-500 hover:from-blue-500 focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            v-if="!IsLogin">تسجيل الدخول / موظف</router-link
          >
          <router-link
            to="EmployeeCRUD"
            class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:to-cyan-500 hover:from-blue-500 focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            v-if="IsLogin && UserType == 'company'">بيانات الموظفين</router-link
          >
          <router-link
            to="AddressCRUD"
            class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:to-cyan-500 hover:from-blue-500 focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            v-if="IsLogin && UserType == 'employee'">العناوين</router-link
          >
          <button
            @click="logout"
            class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:to-cyan-500 hover:from-blue-500 focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            v-if="IsLogin">تسجيل خروج</button
          >
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import firebase from "@/firebase";

export default {
  name: "Navbar",
  setup() {
    const router = useRouter();
    const store = useStore();

    const IsLogin = computed(() => store.state.isLogin);
    const UserType = computed(() => store.state.userType);

    function logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          router.push("/");
        });
    }

    return { IsLogin, UserType, logout };
  },
};
</script>
