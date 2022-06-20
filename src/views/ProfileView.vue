<template>
  <div class="hero min-h-screen">
    <div class="hero-content flex-col">
      <div class="text-center mb-2 text-blue-500 flex flex-col items-center">
        <h1 class="text-5xl font-bold mb-5">بيانات الحساب</h1>
        <img :src="store.img" :alt="store.name" width="300" class="mb-0" />
      </div>
      <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div class="card-body">
          <div class="form-control">
            <label class="label">
              <span class="label-text">أسم الشركه</span>
            </label>
            <input
              type="text"
              placeholder="اسم الشركه"
              class="input input-bordered"
              v-model="name"
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">رقم الهاتف</span>
            </label>
            <input
              type="text"
              placeholder="phone"
              class="input input-bordered"
              v-model="phone"
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">البريد الإلكترونى</span>
            </label>
            <input
              type="email"
              disabled
              placeholder="email"
              class="input input-bordered"
              v-model="store.email"
            />
          </div>
          <div class="form-control">
            <label class="label flex-col">
              <span class="label-text mb-3">صوره الشعار</span>
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
            <button
              class="btn btn-primary"
              @click="editProfile"
              :disabled="!btn"
            >
              تعديل الحساب
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import app from "@/firebase";
import { addDoc, doc, getFirestore, setDoc } from "firebase/firestore";
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
const auth = getAuth();
const storage = getStorage();
const router = useRouter();
const store = useAuthStore();

const name = ref<string>(store.name);
const phone = ref<string>(store.phone);

const imgURL = ref<string>("");
const imgData = reactive([]);
const imgPreview = ref<any>("");
const imgUpload = ref(0);
const btn = ref(true);

async function editProfile() {
  if (imgPreview.value != "") {
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
        createToast(error, {
          type: "danger",
        });
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (URL) => {
          btn.value = true;
          imgURL.value = URL;
          await setDoc(doc(db, "companies", store.id), {
            companyName: name.value,
            companyEmail: store.email,
            companyImage: imgURL.value,
            companyPassword: store.password,
            companyPhone: phone.value,
            companyPercentage: Number(store.percentage),
          }).then(() => {
            createToast("تم تعديل حساب الشركه", {
              type: "success",
            });
            store.name = name.value;
            store.img = imgURL.value;
            store.phone = phone.value;
          });
        });
      }
    );
  } else {
    await setDoc(doc(db, "companies", store.id), {
      companyName: name.value,
      companyEmail: store.email,
      companyImage: store.img,
      companyPassword: store.password,
      companyPhone: phone.value,
      companyPercentage: Number(store.percentage),
    }).then(() => {
      createToast("تم تعديل حساب الشركه", {
        type: "success",
      });
      store.name = name.value;
      store.phone = phone.value;
    });
  }
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

<style scoped>
.hero {
  background-image: url("../assets/images/jason-leung-SAYzxuS1O3M-unsplash.jpg");
}
.hero-content {
  background: #ffffffd4;
  padding: 50px;
  border-radius: 5px;
}
</style>
