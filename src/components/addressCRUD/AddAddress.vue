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
      <!-- Start image-->
      <div class="mb-3">
        <label for="formFile" class="form-label">الصورة الشخصيه</label>
        <template v-if="imgPreview">
          <img :src="imgPreview" class="img-fluid" height="300" />
          <p class="mb-0">file name: {{ imgData.value.name }}</p>
          <p class="mb-0">
            size: {{ Math.round(imgData.value.size / 1024) }}KB
          </p>
        </template>
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
        <h5 class="mx-3 w-1/5">العنوان تفصيلا</h5>
        <input
          type="text"
          name="AddressDetail"
          id="AddressDetail"
          class="my-3 w-4/5 rounded-lg"
          v-model="registerForm.AddressDetail"
        />
      </div>
      <div class="flex items-center w-full">
        <label for="map" class="mx-3 w-1/5">رابط الخريطه</label>

        <input
          type="text"
          class="my-3 w-4/5 rounded-lg"
          required
          v-model="map"
          id="map"
        />
      </div>
      <div class="field" v-if="map != ''">
        <iframe
          :src="GoogleMapsURLToEmbedURL"
          style="width: 100%"
          allowfullscreen="fasle"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <button
        type="submit"
        class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 mt-3 hover:to-cyan-500 hover:from-blue-500 focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        حفظ العنوان
      </button>
    </form>
  </div>
</template>

<script setup>
import firebase from "@/firebase";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import useVuelidate from "@vuelidate/core";
import { helpers, required, minLength } from "@vuelidate/validators";
import { reactive, ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import AlertDanger from "../alert/AlertDanger.vue";

const router = useRouter();
const db = firebase.firestore();

const map = ref("");
const userImg = ref("");
const imgData = reactive([]);
const imgPreview = ref("");
const imgUpload = ref(0);
const isDisabled = ref(false);

const GoogleMapsURLToEmbedURL = computed(() => {
  var coords = /\@([0-9\.\,\-a-zA-Z]*)/.exec(map.value);
  if (coords != null) {
    var coordsArray = coords[1].split(",");
    return (
      "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d20000!2d" +
      coordsArray[1] +
      "!3d" +
      coordsArray[0] +
      "!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2suk!4v1486486434098"
    );
  }
});

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

  const storageRef = firebase
    .storage()
    .ref(`${imgData.value.name}`)
    .put(imgData.value);
  storageRef.on(
    `state_changed`,
    (snapshot) => {
      imgUpload.value = Math.floor(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
    },
    (error) => {
      console.log(error);
    },
    () => {
      storageRef.snapshot.ref.getDownloadURL().then((downloadURL) => {
        console.log("File available at", downloadURL);
        userImg.value = downloadURL;
        db.collection("address")
          .add({
            AddressArea: registerForm.AddressArea,
            AddressDetail: registerForm.AddressDetail.toLowerCase(),
            Map: map.value,
            Img: userImg.value,
            CompanyName: store.state.userCompany,
            EmployeeEmail: store.state.userEmail,
          })
          .then(() => {
            router.push("/");
          });
        
      });
    }
  );
}

function DetectFiles(input) {
  imgData.value = input[0];
  if (input) {
    var reader = new FileReader();
    reader.onload = (e) => {
      imgPreview.value = e.target.result;
    };
    reader.readAsDataURL(input[0]);
  }
}
</script>
