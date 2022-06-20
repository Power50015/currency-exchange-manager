<template>
  <div class="container mx-auto">
    <div class="text-center lg:text-right mb-10 text-blue-500">
      <h1 class="text-5xl font-bold">عمل حساب موظف</h1>
    </div>
    <div class="card flex-shrink-0 w-full shadow-2xl bg-base-100">
      <div class="card-body">
        <div class="form-control">
          <label class="label">
            <span class="label-text">أسم الموظف</span>
          </label>
          <input
            type="text"
            placeholder="اسم الموظف"
            class="input input-bordered"
            v-model="name"
          />
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">البريد الإلكترونى للموظف</span>
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
          <label class="label flex-col">
            <span class="label-text mb-3">صوره الموظف</span>
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
            عمل الحساب
          </button>
        </div>
      </div>
    </div>
    <h2 class="text-5xl p-5 m-[50px] text-indigo-600">الموظفين</h2>
    <div class="flex justify-around flex-row flex-wrap">
      <div
        class="basis-1/8 flex justify-center mb-5"
        v-for="item in employeiesData"
        :key="item.key"
      >
        <div class="card bg-base-100 shadow-xl w-100">
          <figure>
            <img
              :src="item.EmployeeImage"
              :alt="item.EmployeeName"
              class="card-img"
            />
          </figure>
          <div class="card-body">
            <h2 class="card-title">
              {{ item.EmployeeName }}
            </h2>
            <p>{{ item.EmployeeEmail }}</p>
            <p>{{ item.EmployeePhone }}</p>
          </div>
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

const name = ref<string>("");
const email = ref<string>("");
const password = ref<string>("");
const phone = ref<string>("");

const imgURL = ref<string>("");
const imgData = reactive([]);
const imgPreview = ref<any>("");
const imgUpload = ref(0);
const btn = ref(true);

const employeiesData = reactive([] as any[]);

getData();
async function getData() {
  employeiesData.length = 0;
  const q = query(
    collection(db, "employees"),
    where("CompanyEmail", "==", authStore.email)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    employeiesData.push(doc.data());
  });
}

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
      getDownloadURL(uploadTask.snapshot.ref)
        .then((URL) => {
          btn.value = true;
          imgURL.value = URL;
        })
        .then(() => {
          createUserWithEmailAndPassword(auth, email.value, password.value)
            .then((userCredential) => {
              const user = userCredential.user;
              addDoc(collection(db, "employees"), {
                CompanyName: authStore.name,
                CompanyEmail: authStore.email,
                CompanyImage: authStore.img,
                CompanyPhone: authStore.phone,
                CompanyPercentage: Number(authStore.percentage),
                EmployeeName: name.value,
                EmployeeEmail: email.value,
                EmployeeImage: imgURL.value,
                EmployeePhone: phone.value,
              }).then(() => {
                createToast("تم إضافه الموظف", {
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

          setTimeout(() => {
            signOut(auth).then(() => {
              signInWithEmailAndPassword(
                auth,
                authStore.email,
                authStore.password
              ).then(() => {
                getData();
              });
            });
          }, 1500);
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
