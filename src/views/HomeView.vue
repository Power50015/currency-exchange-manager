<template>
  <HomePage v-if="!auth.isLogin"/>
  <Dashbordpage v-if="auth.type == 'companies'"/>
  <EmployeiesDashbord v-if="auth.type == 'employees'"/>
</template>
<script setup lang="ts">
import HomePage from "@/components/HomePage.vue";
import Dashbordpage from "@/components/Dashbordpage.vue";
import EmployeiesDashbord from "@/components/EmployeiesDashbord.vue";

import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();
</script>
