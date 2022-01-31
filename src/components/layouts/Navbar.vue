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
            >تسجيل الدخول / موظف</router-link
          >
        </div>
      </div>
    </div>
  </nav>
</template>
