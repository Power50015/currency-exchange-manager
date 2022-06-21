<template>
  <div class="container mx-auto">
    <div class="text-center lg:text-right mb-10 text-blue-500">
      <h1 class="text-5xl font-bold">تسجيل معامله جديده</h1>
    </div>
    <div class="card flex-shrink-0 w-full shadow-2xl bg-base-100">
      <div class="card-body">
        <div class="form-control">
          <label class="label">
            <span class="label-text">الرقم القومى للعميل</span>
          </label>
          <input
            type="text"
            class="input input-bordered"
            v-model="CustomerID"
          />
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">المبلغ المحول</span>
          </label>
          <div class="flex">
            <input
              type="number"
              class="input input-bordered w-1/2 m-3"
              v-model="from"
              @change="CurrencyToNumberCalc"
            />
            <select
              v-model="fromPrefix"
              class="input input-bordered w-1/2 m-3"
              @change="CurrencyToNumberCalc"
            >
              <option value="AED">AED</option>
              <option value="ARS">ARS</option>
              <option value="AUD">AUD</option>
              <option value="BGN">BGN</option>
              <option value="BRL">BRL</option>
              <option value="BSD">BSD</option>
              <option value="CAD">CAD</option>
              <option value="CHF">CHF</option>
              <option value="CLP">CLP</option>
              <option value="CNY">CNY</option>
              <option value="COP">COP</option>
              <option value="CZK">CZK</option>
              <option value="DKK">DKK</option>
              <option value="DOP">DOP</option>
              <option value="EGP">EGP</option>
              <option value="EUR">EUR</option>
              <option value="FJD">FJD</option>
              <option value="GBP">GBP</option>
              <option value="GTQ">GTQ</option>
              <option value="HKD">HKD</option>
              <option value="HRK">HRK</option>
              <option value="HUF">HUF</option>
              <option value="IDR">IDR</option>
              <option value="ILS">ILS</option>
              <option value="INR">INR</option>
              <option value="ISK">ISK</option>
              <option value="JPY">JPY</option>
              <option value="KRW">KRW</option>
              <option value="KZT">KZT</option>
              <option value="MXN">MXN</option>
              <option value="MYR">MYR</option>
              <option value="NOK">NOK</option>
              <option value="NZD">NZD</option>
              <option value="PAB">PAB</option>
              <option value="PEN">PEN</option>
              <option value="PHP">PHP</option>
              <option value="PKR">PKR</option>
              <option value="PLN">PLN</option>
              <option value="PYG">PYG</option>
              <option value="RON">RON</option>
              <option value="RUB">RUB</option>
              <option value="SAR">SAR</option>
              <option value="SEK">SEK</option>
              <option value="SGD">SGD</option>
              <option value="THB">THB</option>
              <option value="TRY">TRY</option>
              <option value="TWD">TWD</option>
              <option value="UAH">UAH</option>
              <option value="USD">USD</option>
              <option value="UYU">UYU</option>
              <option value="VND">VND</option>
              <option value="ZAR">ZAR</option>
            </select>
          </div>
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">المحول إليه</span>
          </label>
          <div class="flex">
            <input
              type="number"
              class="input input-bordered w-1/2 m-3"
              v-model="to"
            />
            <select v-model="toPrefix" class="input input-bordered w-1/2 m-3">
              <option value="AED">AED</option>
              <option value="ARS">ARS</option>
              <option value="AUD">AUD</option>
              <option value="BGN">BGN</option>
              <option value="BRL">BRL</option>
              <option value="BSD">BSD</option>
              <option value="CAD">CAD</option>
              <option value="CHF">CHF</option>
              <option value="CLP">CLP</option>
              <option value="CNY">CNY</option>
              <option value="COP">COP</option>
              <option value="CZK">CZK</option>
              <option value="DKK">DKK</option>
              <option value="DOP">DOP</option>
              <option value="EGP">EGP</option>
              <option value="EUR">EUR</option>
              <option value="FJD">FJD</option>
              <option value="GBP">GBP</option>
              <option value="GTQ">GTQ</option>
              <option value="HKD">HKD</option>
              <option value="HRK">HRK</option>
              <option value="HUF">HUF</option>
              <option value="IDR">IDR</option>
              <option value="ILS">ILS</option>
              <option value="INR">INR</option>
              <option value="ISK">ISK</option>
              <option value="JPY">JPY</option>
              <option value="KRW">KRW</option>
              <option value="KZT">KZT</option>
              <option value="MXN">MXN</option>
              <option value="MYR">MYR</option>
              <option value="NOK">NOK</option>
              <option value="NZD">NZD</option>
              <option value="PAB">PAB</option>
              <option value="PEN">PEN</option>
              <option value="PHP">PHP</option>
              <option value="PKR">PKR</option>
              <option value="PLN">PLN</option>
              <option value="PYG">PYG</option>
              <option value="RON">RON</option>
              <option value="RUB">RUB</option>
              <option value="SAR">SAR</option>
              <option value="SEK">SEK</option>
              <option value="SGD">SGD</option>
              <option value="THB">THB</option>
              <option value="TRY">TRY</option>
              <option value="TWD">TWD</option>
              <option value="UAH">UAH</option>
              <option value="USD">USD</option>
              <option value="UYU">UYU</option>
              <option value="VND">VND</option>
              <option value="ZAR">ZAR</option>
            </select>
          </div>
        </div>
        <div class="form-control flex flex-row">
          <label class="label border p-3 m-3">
            سعر التحويل : {{ toPrice }}
          </label>
          <label class="label border p-3 m-3">
            نسبه الشركه : {{ authStore.percentage }} %
          </label>
          <label class="label border p-3 m-3">
            أرباح الشركه : {{ (CompanyPercentage * Number(to)).toFixed(2) }}
          </label>
          <label class="label border p-3 m-3">
            صافى المبلغ : {{ (to - CompanyPercentage * Number(to)).toFixed(2) }}
          </label>
        </div>
        <div class="form-control mt-6">
          <button class="btn btn-primary" @click="add">حفظ العمليه</button>
        </div>
      </div>
    </div>
    <div class="my-5 py-5">
      <div class="overflow-x-auto">
        <table class="table w-full">
          <!-- head -->
          <thead>
            <tr>
              <th>رقم العميل القومى</th>
              <th>المبلغ المحول</th>
              <th>العمله المحوله</th>
              <th>المبلغ المحول إليه</th>
              <th>العمله المحول إليها</th>
              <th>سعر الصرف</th>
              <th>نسبه الشركه</th>
              <th>أرباح الشركه</th>
              <th>الإجمالى</th>
              <th>الموظف المسئول</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in currencyActionData" :key="item.key">
              <td>{{ item.customerID }}</td>
              <td>{{ item.currencyFromNumber }}</td>
              <td>{{ item.currencyFrom }}</td>
              <td>{{ (item.currencyToNumber).toFixed(2) }}</td>
              <td>{{ item.currencyTo }}</td>
              <td>{{ item.toPrice }}</td>
              <td>{{ item.CompanyPercentage }} %</td>
              <td>{{ item.companyProfits.toFixed(2) }}</td>
              <td>
                {{ (item.currencyToNumber - item.companyProfits).toFixed(2) }}
              </td>
              <td>{{ item.employeeName }}</td>
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
  getFirestore,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
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

const from = ref<number>(0);
const fromPrefix = ref<string>("USD");
const to = ref(0);
const toPrefix = ref<string>("EGP");
const CustomerID = ref<string>("");
const CompanyPercentage = ref(Number(authStore.percentage) / 100);
const toPrice = ref();
CurrencyToNumberCalc();
function CurrencyToNumberCalc() {
  fetch(
    `https://v6.exchangerate-api.com/v6/${
      import.meta.env.VITE_APP_Exchangerate
    }/latest/${fromPrefix.value}`
  )
    .then((res) => res.json())
    .then((data) => {
      toPrice.value = data.conversion_rates[toPrefix.value].toFixed(2);
      to.value = (from.value * data.conversion_rates[toPrefix.value]).toFixed(
        2
      );
    });
}

function add() {
  addDoc(collection(db, "currencyAction"), {
    currencyFrom: fromPrefix.value,
    currencyFromNumber: Number(from.value),
    currencyTo: toPrefix.value,
    currencyToNumber: Number(to.value),
    CompanyPercentage: authStore.percentage,
    companyProfits: Number(
      (CompanyPercentage.value * Number(to.value)).toFixed(2)
    ),
    toPrice: Number(toPrice.value),
    timeStamp: serverTimestamp(),
    customerID: CustomerID.value,
    employeeEmail: authStore.email,
    employeeName: authStore.name,
    CompanyName: authStore.CompanyName,
    CompanyEmail: authStore.CompanyEmail,
    CompanyImage: authStore.CompanyImage,
    CompanyPhone: authStore.CompanyPhone,
  }).then(() => {
    createToast("تم إضافه المعامله", {
      type: "success",
    });
    getData();
    from.value = 0;
    to.value = 0;
    CustomerID.value = "";
  });
}

const currencyActionData = reactive([] as any[]);

getData();
async function getData() {
  currencyActionData.length = 0;
  const q = query(
    collection(db, "currencyAction"),
    where("CompanyEmail", "==", authStore.CompanyEmail)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    currencyActionData.push(doc.data());
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
