<template>
  <div class="container mx-auto">
    <h2 class="text-5xl font-thin text-blue-500 my-5 text-center">
      أضف العناوين
    </h2>
    <div class=" w-full items-center grid">
      <add-address />
    </div>
  </div>
</template>

<script>
import AddAddress from "@/components/addressCRUD/AddAddress.vue";
export default {
  name: "AddressCRUD",
  components: { AddAddress },
};
</script>

<style></style>
