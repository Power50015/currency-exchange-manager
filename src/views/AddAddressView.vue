<template>
  <div class="container mx-auto">
    <div class="text-center lg:text-right mb-10 text-blue-500">
      <h1 class="text-5xl font-bold">عمل حساب موظف</h1>
    </div>
    <div class="card flex-shrink-0 w-full shadow-2xl bg-base-100">
      <div class="card-body">
        <div class="form-control">
          <label class="label">
            <span class="label-text">منطقه الفرع</span>
          </label>
          <select v-model="area" class="input input-bordered">
            <option value="القاهره">القاهره</option>
            <option value="اسكندريه">اسكندريه</option>
            <option value="الجيزه">الجيزه</option>
            <option value="السويس">السويس</option>
            <option value="الإسماعيلية">الإسماعيلية</option>
            <option value="بورسعيد">بورسعيد</option>
          </select>
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">عنوان الفرع</span>
          </label>
          <input
            type="text"
            class="input input-bordered"
            v-model="detail"
          />
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">رابط الخريطه</span>
          </label>
          <input
            type="text"
            class="input input-bordered"
            v-model="map"
          />
        </div>
        <div class="form-control">
          <label class="label flex-col">
            <span class="label-text mb-3">صوره الفرع</span>
            <template v-if="imgPreview">
              <img
                :src="imgPreview"
                class="img-fluid mb-4"
                height="300"
                width="300"
              />
              <p class="mb-0">أسم الملف: {{ imgData.value.name }}</p>
              <p class="mb-0">
                المساحه: {{ Math.round(imgData.value.size / 1024) }}KB
              </p>
            </template>
            <h6 class="mb-3 text-white">
              حاله رفع الصوره : <span v-if="imgUpload == 100">أكتمل</span>
            </h6>
          </label>
          <progress
            class="progress w-100 mb-3"
            :value="imgUpload"
            max="100"
          ></progress>
          <input
            class="form-control"
            type="file"
            id="formFile"
            accept="image/jpeg"
            @change="DetectFiles($event.target.files)"
          />
        </div>
        <div class="form-control mt-6">
          <button class="btn btn-primary" @click="add" :disabled="!btn">
            حفظ الفرع
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import app from "@/firebase";
import { addDoc, getFirestore, query, where } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { useAuthStore } from "@/stores/auth";
import { reactive, ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import {
  getStorage,
  ref as refire,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";


const db = getFirestore();
const storage = getStorage();
const authStore = useAuthStore();
const auth = getAuth();
const router = useRouter();

const area = ref<string>("القاهره");
const detail = ref<string>("");
const map = ref<string>("");

const imgURL = ref<string>("");
const imgData = reactive([]);
const imgPreview = ref<any>("");
const imgUpload = ref(0);
const btn = ref(true);

function add() {
  btn.value = false;
  const storageRef = refire(storage, `${imgData.value.name}`);
  const uploadTask = uploadBytesResumable(storageRef, imgData.value);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      imgUpload.value = Math.floor(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
    },
    (error) => {
      alert(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((URL) => {
        btn.value = true;
        imgURL.value = URL;
        addDoc(collection(db, "address"), {
          CompanyName: authStore.CompanyName,
          CompanyEmail: authStore.CompanyEmail,
          CompanyImage: authStore.CompanyImage,
          CompanyPhone: authStore.CompanyPhone,
          CompanyPercentage: Number(authStore.percentage),
          EmployeeEmail: authStore.email,
          AddressArea: area.value,
          AddressDetail: detail.value,
          Img: imgURL.value,
          Map: map.value,
        }).then(() => {
          createToast("تم إضافه الفرع", {
            type: "success",
          });
          router.push("/");
        });
      });
    }
  );
}

function DetectFiles(input: any) {
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

<style scoped>
.card-img {
  height: 260px;
  width: 100%;
}
</style>
