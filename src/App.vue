<template>
  <Navbar />
  <RouterView />
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { RouterLink, RouterView } from "vue-router";
import Navbar from "@/components/Navbar.vue";

const auth = useAuthStore();
</script>
<style>
@import "@/assets/base.css";
</style>
