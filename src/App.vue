<template>
  <navbar />
  <router-view />
</template>
<script>
import Navbar from "@/components/layouts/Navbar.vue";
export default {
  components: { Navbar },
};
</script>
<style>
* {
  font-family: "Baloo Bhaijaan 2", cursive;
}
</style>
