<template>
  <div class="container mx-auto">
    <div class="flex justify-around mt-5 pt-5 flex-wrap">
      <div class="card w-96 bg-base-100 shadow-xl image-full m-3">
        <figure>
          <img
            src="@/assets/images/t-h-chia-tVZMk-cidEc-unsplash.jpg"
            alt="الفروع"
          />
        </figure>
        <div class="card-body">
          <h2 class="card-title text-5xl">الفروع</h2>
          <p class="text-5xl mt-5 pt-5">{{ addressCount }}</p>
        </div>
      </div>
      <div class="card w-96 bg-base-100 shadow-xl m-3">
        <figure class="px-10 pt-10">
          <img :src="authStore.img" alt="شعار الشركه" class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
          <h2 class="card-title">{{ authStore.name }}</h2>
          <p>{{ authStore.email }}</p>
          <p>{{ authStore.phone }}</p>
        </div>
      </div>
      <div class="card w-96 bg-base-100 shadow-xl m-3">
        <figure class="px-10 pt-10">
          <img
            :src="authStore.CompanyImage"
            alt="شعار الشركه"
            class="rounded-xl"
          />
        </figure>
        <div class="card-body items-center text-center">
          <h2 class="card-title">{{ authStore.CompanyName }}</h2>
          <p>{{ authStore.CompanyEmail }}</p>
          <p>{{ authStore.CompanyPhone }}</p>
          <p>نسبه الشركه : {{ authStore.percentage }}%</p>
        </div>
      </div>
    </div>

    <h2 class="text-5xl p-5 m-[50px] text-indigo-600">الفروع</h2>
    <div class="flex justify-around flex-wrap">
      <router-link to="/add-address" class="basis-1/3">
        <div class="card bg-base-100 shadow-xl w-96 mb-5">
          <figure>
            <img
              src="@/assets/images/t-h-chia-tVZMk-cidEc-unsplash.jpg"
              alt="الفروع"
            />
          </figure>
          <div class="card-body">
            <h2 class="card-title text-5xl text-indigo-600">أضف فرع</h2>
          </div>
        </div>
      </router-link>

      <div class="basis-1/3" v-for="item in addressData" :key="item.key">
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
const addressCount = ref();
const empoleyCount = ref();
getData();

async function getData() {
  addressData.length = 0;
  const q = query(
    collection(db, "address"),
    where("CompanyEmail", "==", authStore.CompanyEmail)
  );
  const querySnapshot = await getDocs(q);
  addressCount.value = querySnapshot.size;
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
