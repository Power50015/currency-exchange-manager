<template>
  <div class="hero min-h-screen">
    <div class="hero-content flex-col">
      <div class="text-center lg:text-right mb-10 text-blue-500">
        <h1 class="text-5xl font-bold">عمل حساب شركه</h1>
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
              <span class="label-text">البريد الإلكترونى للشركه</span>
            </label>
            <input
              type="text"
              placeholder="email"
              class="input input-bordered"
              v-model="email"
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
              <span class="label-text">نسبه الربح</span>
            </label>
            <input
              type="number"
              placeholder="نسبه الربح"
              class="input input-bordered"
              v-model="percentage"
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
          <div class="form-control">
            <label class="label">
              <span class="label-text">كلمه المرور</span>
            </label>
            <input
              type="password"
              placeholder="password"
              class="input input-bordered"
              v-model="password"
            />
          </div>
          <div class="form-control mt-6">
            <button class="btn btn-primary" @click="addUser" :disabled="!btn">
              تسجيل الدخول
            </button>
            <router-link to="/company-login" class="mt-3 link text-indigo-600"
              >لدى حساب بالفعل</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import app from "@/firebase";
import { addDoc, getFirestore } from "firebase/firestore";
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
const router = useRouter();
const store = useAuthStore();

const name = ref<string>("");
const email = ref<string>("");
const password = ref<string>("");
const phone = ref<string>("");
const percentage = ref<string>("");

const imgURL = ref<string>("");
const imgData = reactive([]);
const imgPreview = ref<any>("");
const imgUpload = ref(0);
const btn = ref(true);

function addUser() {
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
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email.value, password.value)
          .then((userCredential) => {
            const user = userCredential.user;
            addDoc(collection(db, "companies"), {
              companyName: name.value,
              companyEmail: email.value,
              companyImage: imgURL.value,
              companyPassword: password.value,
              companyPhone: phone.value,
              companyPercentage:  Number(percentage.value),
            }).then((data) => {
              store.id = data.id;
              store.name = name.value;
              store.email = email.value;
              store.img = imgURL.value;
              store.password = password.value;
              store.phone = phone.value;
              store.percentage = percentage.value;
              store.isLogin = true;
              store.type = "companies";
              router.push("/");
              createToast("تم إضافه الشركه", {
                type: "success",
              });
            });
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            createToast(errorCode, {
              type: "danger",
            });
            createToast(errorMessage, {
              type: "danger",
            });
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
