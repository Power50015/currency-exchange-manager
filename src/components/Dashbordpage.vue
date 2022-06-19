<template>
  <div class="container mx-auto">
    <div class="flex justify-around mt-5 pt-5  flex-wrap">
      <div class="card w-96 bg-base-100 shadow-xl image-full m-3">
        <figure>
          <img
            src="@/assets/images/t-h-chia-tVZMk-cidEc-unsplash.jpg"
            alt="الفروع"
          />
        </figure>
        <div class="card-body">
          <h2 class="card-title text-5xl">الفروع</h2>
          <p class="text-5xl mt-5 pt-5">99</p>
        </div>
      </div>
      <div class="card w-96 bg-base-100 shadow-xl mt-[30px]">
        <figure class="px-10 pt-10">
          <img :src="authStore.img" alt="شعار الشركه" class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
          <h2 class="card-title">{{ authStore.name }}</h2>
          <p>{{ authStore.email }}</p>
          <p>نسبه الشركه : 2%</p>
        </div>
        <div class="stats shadow">
          <div class="stat">
            <div class="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="inline-block w-8 h-8 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div class="stat-title">الحجوزات</div>
            <div class="stat-value">31</div>
          </div>


          <div class="stat">
            <div class="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="inline-block w-8 h-8 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                ></path>
              </svg>
            </div>
            <div class="stat-title">العمليات</div>
            <div class="stat-value">200</div>
          </div>
        </div>
      </div>
      <div class="card w-96 bg-base-100 shadow-xl image-full m-3">
        <figure>
          <img
            src="@/assets/images/sebastian-herrmann-O2o1hzDA7iE-unsplash.jpg"
            alt="الموظفين"
          />
        </figure>
        <div class="card-body">
          <h2 class="card-title text-5xl">الموظفين</h2>
          <p class="text-5xl mt-5 pt-5">99</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">بيانات الموظفين</button>
          </div>
        </div>
      </div>
    </div>

    <h2 class="text-5xl p-5 m-[50px] text-indigo-600">الفروع</h2>
    <div class="flex justify-around flex-row flex-wrap">
      <div
        class="basis-1/3 flex justify-center"
        v-for="item in addressData"
        :key="item.key"
      >
        <div class="card bg-base-100 shadow-xl w-96 mb-5">
          <figure>
            <img :src="item.Img" :alt="item.CompanyName" class="card-img" />
          </figure>
          <div class="card-body">
            <h2 class="card-title">
              {{ item.AddressDetail }}
              <div class="badge badge-secondary">{{ item.AddressArea }}</div>
            </h2>
            <p>{{ item.EmployeeEmail }}</p>
            <div class="card-actions justify-end">
              <a :href="item.Map" class="btn btn-primary" target="_blank"
                >GPS</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getFirestore } from "firebase/firestore";
import {
  collection,
  getDocs,
  where,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { reactive, ref } from "@vue/reactivity";
import "mosha-vue-toastify/dist/style.css";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const db = getFirestore();
const addressData = reactive([] as any[]);

getAddressData();

async function getAddressData() {
  addressData.length = 0;
  const q = query(
    collection(db, "address"),
    where("CompanyName", "==", authStore.name)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    addressData.push(doc.data());
  });
}
</script>

<style scoped>
.card-img {
  height: 260px;
  width: 100%;
}
</style>
