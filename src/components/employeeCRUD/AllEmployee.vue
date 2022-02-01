<template>
  <div class="my-8">
      <h2 class="text-2xl font-black text-cyan-500 mb-8">بيانات الموظفين</h2>
    <div >
      <table class="min-w-full leading-normal">
        <thead>
          <tr>
            <th
              class="px-5 py-3 border-b-2 border-gray-200 text-center bg-gray-100 text-xs font-semibold text-gray-700 uppercase tracking-wider"
            >
              أسم الموظف
            </th>
            <th
              class="px-5 py-3 border-b-2 text-center border-gray-200 bg-gray-100 text-xs font-semibold text-gray-700 uppercase tracking-wider"
            >
              بريد الإلكترونى للموظف
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="employee in Employees" :key="employee.index">
            <td
              class="px-5 py-5 border-b text-center border-gray-200 bg-white text-sm"
            >
              {{ employee.EmployeeName }}
            </td>
            <td
              class="px-5 py-5 border-b text-center border-gray-200 bg-white text-sm"
            >
              {{ employee.EmployeeEmail }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import firebase from "@/firebase";
import { reactive } from "@vue/reactivity";

export default {
  name: "All Employee",
  setup() {
    const store = useStore();
    var db = firebase.firestore();
    const Employees = reactive([]);

    db.collection("employees")
      .where("CompanyName", "==", store.state.userName)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          Employees.push(doc.data());
        });
      });
    return { Employees };
  },
};
</script>

<style></style>
