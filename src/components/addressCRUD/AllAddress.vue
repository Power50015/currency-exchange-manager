<template>
  <div class="my-8">
      <h2 class="text-2xl font-black text-cyan-500 mb-8">عناوين الفروع</h2>
    <div >
      <table class="min-w-full leading-normal">
        <thead>
          <tr>
            <th
              class="px-5 py-3 border-b-2 border-gray-200 text-center bg-gray-100 text-xs font-semibold text-gray-700 uppercase tracking-wider"
            >
              المنطقه
            </th>
            <th
              class="px-5 py-3 border-b-2 text-center border-gray-200 bg-gray-100 text-xs font-semibold text-gray-700 uppercase tracking-wider"
            >
              العنوان
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="addressData in address" :key="addressData.index">
            <td
              class="px-5 py-5 border-b text-center border-gray-200 bg-white text-sm"
            >
              {{ addressData.AddressArea }}
            </td>
            <td
              class="px-5 py-5 border-b text-center border-gray-200 bg-white text-sm"
            >
              {{ addressData.AddressDetail }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import firebase from "@/firebase";
import { reactive } from "@vue/reactivity";

export default {
  name: "All Address",
  setup() {
    const store = useStore();
    var db = firebase.firestore();
    const address = reactive([]);

    db.collection("address")
      .where("CompanyName", "==", store.state.userCompany)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          address.push(doc.data());
        });
      });
    return { address };
  },
};
</script>

<style></style>
