<template>
  <header class="container mx-auto">
    <div class="flex justify-between flex-wrap items-center">
      <div class="header-content basis-full lg:basis-1/2 animate__ animate__backInRight lg:order-1 order-2 animate__slow animated"
        style="visibility: visible; animation-name: backInRight"
      >
        <div>
          <h1 class="text-6xl leading-[5rem] font-black text-cyan-500 mb-8">
            أشترك الأن و كن أنت و شركتك شركاء فى النجاح
          </h1>
          <div class="text-center">
            <p class="mb-8 text-blue-500 text-2xl">
              يمكنك تسجيل شركتك و عنوين الشركه لتسهل الوصول إلى قاعده عملاء
              كبيره معنا
            </p>
            <router-link
              to="/company-login"
              class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:to-cyan-500 hover:from-blue-500 focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 block"
              >تسجيل الدخول / شركه</router-link
            ><router-link
              to="/company-register"
              class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:to-cyan-500 hover:from-blue-500 focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 block"
            >
              عمل حساب / شركه</router-link
            >
          </div>
        </div>
      </div>
      <div
        class="basis-full lg:basis-1/2 animate__ animate__slideInLeft overflow-hidden order-1 animated"
        style="visibility: visible; animation-name: slideInLeft"
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

<script setup lang="ts"></script>

<style scoped>
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
.header-content {
  width: 50% !important;
}
</style>
