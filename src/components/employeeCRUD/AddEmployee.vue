<template>
  <div class="px-4">
    <h2 class="text-2xl font-black text-cyan-500 mb-8">تسجيل موظف جديد</h2>
    <alert-danger v-for="error of v$.$errors" :key="error.$uid">
      {{ error.$message }}
    </alert-danger>
    <form @submit.prevent="registerEmployee" class="flex flex-col">
      <div class="email-input-container flex items-center w-full">
        <h5 class="mx-3 w-1/5">إسم الموظف</h5>
        <input
          type="text"
          name="EmployeeName"
          id="EmployeeName"
          class="my-3 w-4/5 rounded-lg"
          dir="ltr"
          v-model="registerForm.EmployeeName"
        />
      </div>
      <!-- Start image-->
      <div class="mb-3">
        <label for="formFile" class="form-label">الصورة الشخصيه</label>
        <div class="flex">
          <h6 class="mb-3 text-white">
            حاله رفع الصوره :
            <span v-if="imgUpload == 100">أكتمل</span>
          </h6>
        </div>
        <input
          class="form-control"
          type="file"
          id="formFile"
          accept="image/jpeg"
          @change="DetectFiles($event.target.files)"
        />
      </div>
      <!-- End image-->
      <div class="email-input-container flex items-center w-full">
        <h5 class="mx-3 w-1/5">البريد الإلكترونى</h5>
        <input
          type="email"
          name="EmployeeEmail"
          id="EmployeeEmail"
          class="my-3 w-4/5 rounded-lg"
          dir="ltr"
          v-model="registerForm.EmployeeEmail"
        />
      </div>
      <div class="password-input-container flex items-center w-full">
        <h5 class="mx-3 w-1/5">كلمه المرور</h5>
        <input
          type="password"
          name="EmployeePassword"
          id="EmployeePassword"
          class="my-3 w-4/5 rounded-lg"
          dir="ltr"
          v-model="registerForm.EmployeePassword"
        />
      </div>
      <div class="password-input-container flex items-center w-full">
        <h5 class="mx-3 w-1/5">تأكيد كلمه المرور</h5>
        <input
          type="password"
          name="ConfirmEmployeePassword"
          id="ConfirmEmployeePassword"
          class="my-3 w-4/5 rounded-lg"
          dir="ltr"
          v-model="registerForm.ConfirmEmployeePassword"
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
import { useStore } from "vuex";

import useVuelidate from "@vuelidate/core";
import {
  helpers,
  required,
  email,
  minLength,
  sameAs,
} from "@vuelidate/validators";
import { reactive,ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import AlertDanger from "../alert/AlertDanger.vue";

export default {
  components: { AlertDanger },
  name: "AddEmployee",
  setup() {
    const router = useRouter();
    const db = firebase.firestore();
    const btn = ref(true);

    /**
     * Form Data Model
     */
    const registerForm = reactive({
      EmployeeName: "",
      EmployeeEmail: "",
      EmployeePassword: "",
      ConfirmEmployeePassword: "",
    });

    /**
     * Data Rules
     */
    let userImg = ref("");
    const rules = computed(() => {
      return {
        EmployeeName: {
          required: helpers.withMessage(
            "لا يمكن ترك أسم الموظف فارغ",
            required
          ),
          minLengthValue: helpers.withMessage(
            "أسم الموظف يجب أن لا يقل عن 3 أحرف",
            minLength(3)
          ),
        },
        EmployeeEmail: {
          required: helpers.withMessage(
            "لا يمكن ترك البريد الإلكترونى للموظف فارغ",
            required
          ),
          email: helpers.withMessage("يجب أن يكون الحقل بريد إلكترونى", email),
          minLengthValue: helpers.withMessage(
            "يجب أن لا يقل  البريد الإلكترونى عن 3 أحرف",
            minLength(3)
          ),
        },
        EmployeePassword: {
          required: helpers.withMessage("لا يمكن كلمه المرور", required),
          minLengthValue: helpers.withMessage(
            "يجب أن لا يقل كلمه المرور عن 8 أحرف",
            minLength(8)
          ),
        },
        ConfirmEmployeePassword: {
          sameAs: helpers.withMessage(
            "يجب أن يتطابق كلمتان المرور",
            sameAs(registerForm.EmployeePassword)
          ),
        },
      };
    });

    /**
     * Fire Vaeldtion Function
     */
    const v$ = useVuelidate(rules, registerForm);
    const store = useStore();

    function registerEmployee() {
      v$.value.$touch();
      if (v$.value.$invalid) return 0;
      var db = firebase.firestore();
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          registerForm.EmployeeEmail.toLowerCase(),
          registerForm.EmployeePassword
        )
        .then(() => {
          db.collection("employees")
            .add({
              EmployeeName: registerForm.EmployeeName,
              EmployeeEmail: registerForm.EmployeeEmail.toLowerCase(),
              CompanyName: store.state.userName,
              companyImage: userImg.value,
            })
            .then(() => {
              router.push("/");
            });
        });
    }

    function DetectFiles(img) {
      const imgData = img[0];
      const storageRef = firebase.storage().ref(`${imgData.name}`).put(imgData);
      storageRef.on(
        `state_changed`,
        (snapshot) => {
          console.log(snapshot);
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          storageRef.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log("File available at", downloadURL);
            userImg.value = downloadURL;
            btn.value = false;
          });
        }
      );
    }

    return { registerForm, v$, registerEmployee, DetectFiles };
  },
};
</script>

<style></style>
