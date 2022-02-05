<template>
  <header class="container mx-auto">
    <div class="flex justify-between flex-wrap items-center">
      <div
        class="header-content lg:basis-1/2 animate__animated animate__backInRight lg:order-1 order-2 animate__slow"
      >
        <div v-if="!IsLogin">
          <h1 class="text-6xl leading-[5rem] font-black text-cyan-500 mb-8">
            أشترك الأن و كن أنت و شركتك شركاء فى النجاح
          </h1>
          <div class="text-center">
            <p class="mb-8 text-blue-500 text-2xl">
              يمكنك تسجيل شركتك و عنوين الشركه لتسهل الوصول إلى قاعده عملاء
              كبيره معنا
            </p>
            <router-link
              to="CompanyLogin"
              class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:to-cyan-500 hover:from-blue-500 focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >تسجيل الدخول / شركه</router-link
            >
          </div>
        </div>
        <div v-if="IsLogin" class="text-center">
          <h3 class="text-6xl leading-[5rem] font-black text-cyan-500">
            {{ UserName }}
          </h3>
          <h3 class="text-4xl leading-[5rem] text-cyan-500">{{ UserEmail }}</h3>
          <h3
            v-if="IsLogin && UserType == 'employee'"
            class="text-4xl leading-[5rem] text-blue-500"
          >
            {{ UserCompany }}
          </h3>
          <router-link
            v-if="IsLogin && UserType == 'employee'"
            to="CurrencyExchange"
            class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:to-cyan-500 hover:from-blue-500 focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >تسجيل معامله</router-link
          >
        </div>
      </div>
      <div
        class="lg:basis-1/2 animate__animated animate__slideInLeft overflow-hidden order-1"
      >
        <img
          src="@/assets/images/headerbg2.png"
          alt="header image"
          class="w-full header-img"
        />
      </div>
    </div>
  </header>
</template>

<script>
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";

export default {
  name: "Header",
  setup() {
    const store = useStore();

    const IsLogin = computed(() => store.state.isLogin);
    const UserType = computed(() => store.state.userType);
    const UserName = computed(() => store.state.userName);
    const UserEmail = computed(() => store.state.userEmail);
    const UserCompany = computed(() => store.state.userCompany);

    return { IsLogin, UserType, UserName, UserEmail, UserCompany };
  },
};
</script>

<style>
.header-img {
  animation-name: spin;
  animation-duration: 5000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
