<template>
  <div class="px-4 w-8/12">
    <h2 class="text-2xl font-black text-cyan-500 mb-8">تسجيل الدخول</h2>
    <form @submit.prevent="" class="flex flex-col">
      <div class="email-input-container flex items-center w-full">
        <h5 class="mx-3 w-1/5">البريد الإلكترونى</h5>
        <input
          type="email"
          name="email"
          id="email"
          class="my-3 w-4/5 rounded-lg"
          dir="ltr"
        />
      </div>
      <div class="password-input-container flex items-center w-full">
        <h5 class="mx-3 w-1/5">كلمه المرور</h5>
        <input
          type="password"
          name="password"
          id="password"
          class="my-3 w-4/5 rounded-lg"
          dir="ltr"
        />
      </div>
      <button
        type="submit"
        class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:to-cyan-500 hover:from-blue-500 focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        تسجيل الدخول
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "CompanyLoginForm",
};
</script>

<style></style>
