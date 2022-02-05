<template>
  <div class="container mx-auto">
    <h2 class="text-5xl font-thin text-blue-500 my-5 text-center">تسجيل الدخول كموظف فى شركه</h2>
    <div class="h-[60vh] w-full items-center grid">
      <employee-login-form />
    </div>
  </div>
</template>

<script>
import EmployeeLoginForm from "../components/employeeLogin/EmployeeLoginForm.vue";
export default {
  components: { EmployeeLoginForm },
};
</script>

<style></style>
