<template>
  <div class="container mx-auto">
    <h2 class="text-5xl font-thin text-blue-500 my-5 text-center">
      بيانات الموظفين
    </h2>
    <div class="max-h-[60vh] w-full items-center grid">
      <add-employee />
    </div>
    <div class="w-full">
      <all-employee/>
    </div>
  </div>
</template>

<script>
import AddEmployee from "../components/employeeCRUD/AddEmployee.vue";
import AllEmployee from '../components/employeeCRUD/AllEmployee.vue';
export default {
  name: "EmployeeCRUD",
  components: { AddEmployee, AllEmployee },
};
</script>

<style></style>

AddEmployee
