<template>
  <div class="container mx-auto">
    <h2>تسجيل الدخول كشركه</h2>
    <div
      class="items-center grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8 h-[86vh]"
    >
      <company-login-form class="animate__animated animate__backInRight"/>
      <company-register-form class="animate__animated animate__backInLeft" />
    </div>
  </div>
</template>

<script>
import CompanyLoginForm from "../components/companyLogin/CompanyLoginForm.vue";
import CompanyRegisterForm from "../components/companyLogin/CompanyRegisterForm.vue";
export default {
  components: { CompanyLoginForm, CompanyRegisterForm },
};
</script>

<style></style>
