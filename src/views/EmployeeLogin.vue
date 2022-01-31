<template>
  <div class="container mx-auto">
    <h2>تسجيل الدخول كموظف فى شركه</h2>
    <div class="h-[80vh] w-full">
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
