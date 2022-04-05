<template>
  <div class="my-8">
    <h2 class="text-2xl font-black text-cyan-500 mb-8">عناوين الفروع</h2>

    <div
      class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5"
    >
      <!--Card 2-->
      <router-link
        to="/AddressAdd"
        class="rounded overflow-hidden shadow-lg flex justify-center items-center cursor-pointer hover:text-blue-300 text-blue-500"
      >
        <div class="px-6 py-4">
          <h3 class="font-bold text-xl mb-2">أضف عنوان جديد</h3>
        </div>
      </router-link>

      <div
        class="rounded overflow-hidden shadow-lg"
        v-for="addressData in address"
        :key="addressData.index"
      >
        <img
          class="w-[250]"
          :src="addressData[1].Img"
          :alt="addressData[1].AddressArea"
        />
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">
            {{ addressData[1].AddressArea }}
          </div>
          <p class="text-gray-700 text-base">
            {{ addressData[1].AddressDetail }}
          </p>
        </div>
        <div class="px-6 pt-4 pb-2">
          <a
            :href="addressData[1].Map"
            target="_blank"
            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >الخريطه</a
          >
          <span @click="deleteAddress(addressData[0])"
            class="cursor-pointer inline-block bg-red-500 rounded-full px-3 py-1 text-sm font-semibold text-gray-100 mr-2 mb-2"
            >حذف</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import firebase from "@/firebase";
import { reactive } from "@vue/reactivity";
import { useRouter } from "vue-router";


export default {
  name: "All Address",
  setup() {
    const store = useStore();
    var db = firebase.firestore();
    const address = reactive([]);
    const router = useRouter();

    function deleteAddress(id) {
      db.collection("address")
        .doc(id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
          router.push("/");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    }

    db.collection("address")
      .where("CompanyName", "==", store.state.userCompany)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          address.push([doc.id, doc.data()]);
        });
      });
    return { address, deleteAddress };
  },
};
</script>

<style></style>
