<template>
  <div class="container mx-auto">
    <h2 class="text-5xl font-thin text-blue-500 pt-5 text-center">
      تسجيل الدخول كشركه
    </h2>
    <div
      class="items-center grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8 h-[80vh]"
    >
      <company-register-form class="animate__animated animate__backInLeft" />
    </div>
  </div>
</template>

<script>
import CompanyRegisterForm from "../components/companyLogin/CompanyRegisterForm.vue";
export default {
  components: { CompanyRegisterForm },
};
</script>

<style></style>
