<template>
  <div class="border-r-4 px-4">
    <h2 class="text-2xl font-black text-cyan-500 mb-8">عمل حساب جديد</h2>
    <alert-danger v-for="error of v$.$errors" :key="error.$uid">
      {{ error.$message }}
    </alert-danger>
    <form @submit.prevent="registerCompany" class="flex flex-col">
      <div class="email-input-container flex items-center w-full">
        <h5 class="mx-3 w-1/5">إسم الشركه</h5>
        <input
          type="text"
          name="CompanyName"
          id="CompanyName"
          class="my-3 w-4/5 rounded-lg"
          dir="ltr"
          v-model="registerForm.CompanyName"
        />
      </div>
      <div class="email-input-container flex items-center w-full">
        <h5 class="mx-3 w-1/5">البريد الإلكترونى</h5>
        <input
          type="email"
          name="CompanyEmail"
          id="CompanyEmail"
          class="my-3 w-4/5 rounded-lg"
          dir="ltr"
          v-model="registerForm.CompanyEmail"
        />
      </div>
      <div class="password-input-container flex items-center w-full">
        <h5 class="mx-3 w-1/5">كلمه المرور</h5>
        <input
          type="password"
          name="CompanyPassword"
          id="CompanyPassword"
          class="my-3 w-4/5 rounded-lg"
          dir="ltr"
          v-model="registerForm.CompanyPassword"
        />
      </div>
      <div class="password-input-container flex items-center w-full">
        <h5 class="mx-3 w-1/5">تأكيد كلمه المرور</h5>
        <input
          type="password"
          name="ConfirmCompanyPassword"
          id="ConfirmCompanyPassword"
          class="my-3 w-4/5 rounded-lg"
          dir="ltr"
          v-model="registerForm.ConfirmCompanyPassword"
        />
      </div>
      <button
        type="submit"
        class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:to-cyan-500 hover:from-blue-500 focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        تسجيل الدخول
      </button>
    </form>
  </div>
</template>

<script>
import firebase from "@/firebase";
import { useRouter } from "vue-router";

import useVuelidate from "@vuelidate/core";
import {
  helpers,
  required,
  email,
  minLength,
  sameAs,
} from "@vuelidate/validators";
import { reactive } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import AlertDanger from "../alert/AlertDanger.vue";

export default {
  components: { AlertDanger },
  name: "CompanyRegisterForm",
  setup() {
    const router = useRouter();


    /**
     * Form Data Model
     */
    const registerForm = reactive({
      CompanyName: "",
      CompanyEmail: "",
      CompanyPassword: "",
      ConfirmCompanyPassword: "",
    });

    /**
     * Data Rules
     */
    const rules = computed(() => {
      return {
        CompanyName: {
          required: helpers.withMessage(
            "لا يمكن ترك أسم الشركه فارغ",
            required
          ),
          minLengthValue: helpers.withMessage(
            "أسم الشركه يجب أن لا يقل عن 3 أحرف",
            minLength(3)
          ),
        },
        CompanyEmail: {
          required: helpers.withMessage(
            "لا يمكن ترك البريد الإلكترونى للشركه فارغ",
            required
          ),
          email: helpers.withMessage("يجب أن يكون الحقل بريد إلكترونى", email),
          minLengthValue: helpers.withMessage(
            "يجب أن لا يقل  البريد الإلكترونى عن 3 أحرف",
            minLength(3)
          ),
        },
        CompanyPassword: {
          required: helpers.withMessage("لا يمكن كلمه المرور", required),
          minLengthValue: helpers.withMessage(
            "يجب أن لا يقل كلمه المرور عن 8 أحرف",
            minLength(8)
          ),
        },
        ConfirmCompanyPassword: {
          sameAs: helpers.withMessage(
            "يجب أن يتطابق كلمتان المرور",
            sameAs(registerForm.CompanyPassword)
          ),
        },
      };
    });

    /**
     * Fire Vaeldtion Function
     */
    const v$ = useVuelidate(rules, registerForm);

    function registerCompany() {
      v$.value.$touch();
      if (v$.value.$invalid) return 0;
      var db = firebase.firestore();
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          registerForm.CompanyEmail,
          registerForm.CompanyPassword
        )
        .then(() => {
          db.collection("companies")
            .add({
              companyName: registerForm.CompanyName,
              companyEmail: registerForm.CompanyEmail.toLowerCase(),
            })
            .then(() => {
              router.push("/");
            });
        });
    }
    return { registerForm, v$, registerCompany };
  },
};
</script>

<style></style>
