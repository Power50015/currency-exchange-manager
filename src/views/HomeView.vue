<template>
  <HomePage v-if="!auth.isLogin"/>
  <Dashbordpage v-else/>
</template>
<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import HomePage from "@/components/HomePage.vue";
import Dashbordpage from "@/components/Dashbordpage.vue";

const auth = useAuthStore();
</script>
