<template>
  <div class="px-4">
    <h2 class="text-2xl font-black text-cyan-500 mb-8">تسجيل عنوان جديد</h2>
    <alert-danger v-for="error of v$.$errors" :key="error.$uid">
      {{ error.$message }}
    </alert-danger>
    <form @submit.prevent="registerAddress" class="flex flex-col">
      <div class="email-input-container flex items-center w-full">
        <h5 class="mx-3 w-1/5">منطقه الفرع</h5>
        <select
          name="AddressArea"
          class="my-3 w-4/5 rounded-lg"
          id="AddressName"
          v-model="registerForm.AddressArea"
        >
          <option value="القاهره">القاهره</option>
          <option value="اسكندريه">اسكندريه</option>
          <option value="الجيزه">الجيزه</option>
          <option value="السويس">السويس</option>
          <option value="الإسمعاليه">الإسمعاليه</option>
        </select>
      </div>
      <div class="email-input-container flex items-center w-full">
        <h5 class="mx-3 w-1/5">العنوان تفصيلا</h5>
        <input
          type="text"
          name="AddressDetail"
          id="AddressDetail"
          class="my-3 w-4/5 rounded-lg"
          v-model="registerForm.AddressDetail"
        />
      </div>
      <button
        type="submit"
        class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:to-cyan-500 hover:from-blue-500 focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        حفظ العنوان
      </button>
    </form>
  </div>
</template>

<script>
import firebase from "@/firebase";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import useVuelidate from "@vuelidate/core";
import { helpers, required, minLength } from "@vuelidate/validators";
import { reactive } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import AlertDanger from "../alert/AlertDanger.vue";

export default {
  components: { AlertDanger },
  name: "AddAddress",
  setup() {
    const router = useRouter();

    /**
     * Form Data Model
     */
    const registerForm = reactive({
      AddressArea: "القاهره",
      AddressDetail: "",
    });

    /**
     * Data Rules
     */
    const rules = computed(() => {
      return {
        AddressArea: {
          required: helpers.withMessage("لا يمكن ترك المنطقه  فارغ", required),
          minLengthValue: helpers.withMessage(
            "أسم المنطقه يجب أن لا يقل عن 3 أحرف",
            minLength(3)
          ),
        },
        AddressDetail: {
          required: helpers.withMessage("لا يمكن ترك العنوان  فارغ", required),
          minLengthValue: helpers.withMessage(
            " العنوان يجب أن لا يقل عن 3 أحرف",
            minLength(3)
          ),
        },
      };
    });

    /**
     * Fire Vaeldtion Function
     */
    const v$ = useVuelidate(rules, registerForm);
    const store = useStore();

    function registerAddress() {
      v$.value.$touch();
      if (v$.value.$invalid) return 0;
      var db = firebase.firestore();
      db.collection("address")
        .add({
          AddressArea: registerForm.AddressArea,
          AddressDetail: registerForm.AddressDetail.toLowerCase(),
          CompanyName: store.state.userCompany,
          EmployeeEmail: store.state.userEmail,
        })
        .then(() => {
          router.push("/");
        });
    }
    return { registerForm, v$, registerAddress };
  },
};
</script>
