<template>
  <div class="container mx-auto">
    <h2 class="text-5xl font-thin text-blue-500 my-5 text-center">
      تسجيل معامله جديده
    </h2>
    <alert-danger v-for="error of v$.$errors" :key="error.$uid">
      {{ error.$message }}
    </alert-danger>
    <div class="max-h-[60vh] w-full items-center grid">
      <div class="px-4">
        <form
          @submit.prevent="SaveCurrencyToNumber"
          class="flex flex-col"
          @change="CurrencyToNumberCalc"
        >
          <div class="input-container flex items-center w-full">
            <h5 class="mx-3 w-1/5">الرقم القومى للعميل</h5>
            <input
              type="text"
              name="CustomerID"
              id="CustomerID"
              class="my-3 w-4/5 rounded-lg mx-2"
              v-model="Form.CustomerID"
            />
          </div>
          <div class="input-container flex items-center w-full">
            <h5 class="mx-3 w-1/5">المبلغ المحول</h5>
            <input
              type="number"
              name="CurrencyFrom"
              id="CurrencyFrom"
              class="my-3 w-2/5 rounded-lg mx-2"
              v-model.lazy="Form.CurrencyFromNumber"
              min="0"
              oninput="this.value = 
 !!this.value && Math.abs(this.value) >= 0 ? Math.abs(this.value) : null"
            />
            <select
              name="CurrencyFrom"
              class="my-3 w-2/5 rounded-lg"
              id="CurrencyFrom"
              v-model="Form.CurrencyFrom"
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
          <div class="input-container flex items-center w-full">
            <h5 class="mx-3 w-1/5">المحول إليه</h5>
            <input
              type="number"
              name="CurrencyToNumberCalc"
              id="CurrencyToNumberCalc"
              class="my-3 w-2/5 rounded-lg mx-2"
              disabled
              v-model="Form.CurrencyToNumber"
            />
            <select
              name="CurrencyTo"
              class="my-3 w-2/5 rounded-lg"
              id="CurrencyTo"
              v-model="Form.CurrencyTo"
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
          <button
            type="submit"
            class="text-white bg-gradient-to-r from-blue-500 to-cyan-500 hover:to-blue-500 hover:from-cyan-500 focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            حفظ المعالمه
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";
import useVuelidate from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
import AlertDanger from "../components/alert/AlertDanger.vue";
import firebase from "@/firebase";
import { useRouter } from "vue-router";

export default {
  name: "CurrencyExchange",
  components: { AlertDanger },
  setup() {
    const router = useRouter();
    const Form = reactive({
      CustomerID: "",
      CurrencyFromNumber: 1,
      CurrencyFrom: "USD",
      CurrencyToNumber: 0,
      CurrencyTo: "EGP",
    });

    /**
     * Data Rules
     */
    const rules = computed(() => {
      return {
        CustomerID: {
          required: helpers.withMessage(
            "لا يمكن ترك الرقم القومى للعميل  فارغ",
            required
          ),
        },
      };
    });

    /**
     * Fire Vaeldtion Function
     */
    const v$ = useVuelidate(rules, Form);
    const store = useStore();

    function SaveCurrencyToNumber() {
      v$.value.$touch();
      if (v$.value.$invalid) return 0;
      var db = firebase.firestore();
      db.collection("currencyAction")
        .add({
          customerID: Form.CustomerID,
          currencyFromNumber: Form.CurrencyFromNumber,
          currencyFrom: Form.CurrencyFrom,
          currencyToNumber: Form.CurrencyToNumber,
          currencyTo: Form.CurrencyTo,
          employeeEmail: store.state.userEmail,
        })
        .then(() => {
          router.push("/");
        });
    }

    function CurrencyToNumberCalc() {
      fetch(
        `https://v6.exchangerate-api.com/v6/${process.env.VUE_APP_Exchangerate}/latest/${Form.CurrencyFrom}`
      )
        .then((res) => res.json())
        .then((data) => {
          Form.CurrencyToNumber = (
            Form.CurrencyFromNumber * data.conversion_rates[Form.CurrencyTo]
          ).toFixed(2);
        });
    }

    return { v$, Form, CurrencyToNumberCalc, SaveCurrencyToNumber };
  },
};
</script>

<style></style>
