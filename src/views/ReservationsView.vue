<template>
  <div class="w-100">
    <div class="text-center lg:text-right mb-10 text-blue-500">
      <h1 class="text-5xl font-bold">الحجوزات</h1>
    </div>
    <div class="my-5 py-5">
      <div class="overflow-x-auto">
        <table class="table w-full">
          <!-- head -->
          <thead>
            <tr>
              <th>رقم العمليه</th>
              <th>رقم العميل القومى</th>
              <th>أسم العميل</th>
              <th>المبلغ المحول</th>
              <th>العمله المحوله</th>
              <th>المبلغ المحول إليه</th>
              <th>العمله المحول إليها</th>
              <th>سعر الصرف</th>
              <th>نسبه الشركه</th>
              <th>أرباح الشركه</th>
              <th>الإجمالى</th>
              <th>منطقه الفرع</th>
              <th>عنوان الفرع</th>
              <th>حاله الحجز</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in currencyActionData" :key="item.key">
              <td>{{ item.id }}</td>
              <td>{{ item.customerID }}</td>
              <td>{{ item.customerName }}</td>
              <td>{{ item.currencyFromNumber }}</td>
              <td>{{ item.currencyFrom }}</td>
              <td>{{ item.currencyToNumber.toFixed(2) }}</td>
              <td>{{ item.currencyTo }}</td>
              <td>{{ item.toPrice }}</td>
              <td>{{ item.branchDetails["CompanyPercentage"] }} %</td>
              <td>{{ item.companyProfits.toFixed(2) }}</td>
              <td>
                {{ (item.currencyToNumber - item.companyProfits).toFixed(2) }}
              </td>
              <td>{{ item.branchDetails["AddressArea"] }}</td>
              <td>{{ item.branchDetails["AddressDetail"] }}</td>
              <td>
                <button
                  class="btn btn-outline btn-primary"
                  v-if="item.state == 0"
                  @click="editStates(item.id)"
                >
                  أتمام الحجز
                </button>
                <span class="text-blue-500" v-else>تم الحجز</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import app from "@/firebase";
import {
  addDoc,
  doc,
  getFirestore,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { useAuthStore } from "@/stores/auth";
import { reactive, ref } from "@vue/reactivity";
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";

const db = getFirestore();
const authStore = useAuthStore();

const currencyActionData = reactive([] as any[]);

getData();
async function getData() {
  currencyActionData.length = 0;
  const q = query(
    collection(db, "reservations"),
    where("branchDetails.CompanyEmail", "==", authStore.CompanyEmail),
    orderBy("state"),
    orderBy("timeStamp")
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    currencyActionData.push({
      id: doc.id,
      ...doc.data(),
    });
  });
}

async function editStates(id: string) {
  await updateDoc(doc(db, "reservations", id), {
    state: 1,
  }).then(() => {
    createToast("تم تعديل حاله الحجز.", {
      type: "success",
    })
    getData();
  });
}
</script>

<style scoped>
.card-img {
  height: 260px;
  width: 100%;
}
th,
td {
  border-radius: 0 !important;
  text-align: center;
}
</style>
