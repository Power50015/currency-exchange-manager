<template>
  <div class="container mx-auto">
    <h2 class="text-5xl font-thin text-blue-500 my-5 text-center">
      بيانات العناوين
    </h2>
    <div class="max-h-[60vh] w-full items-center grid">
      <add-address />
    </div>
    <div class="w-full">
      <all-address/>
    </div>
  </div>
</template>

<script>
import AddAddress from "@/components/addressCRUD/AddAddress.vue";
import AllAddress from '@/components/addressCRUD/AllAddress.vue';
export default {
  name: "AddressCRUD",
  components: { AddAddress, AllAddress },
};
</script>

<style></style>