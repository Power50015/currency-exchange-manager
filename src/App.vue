<template>
  <navbar />
  <router-view />
</template>
<script>
import firebase from "@/firebase";
import { useStore } from "vuex";
import Navbar from "@/components/layouts/Navbar.vue";
import { onBeforeMount } from "@vue/runtime-core";
export default {
  components: { Navbar },
  name: "App",
  setup() {
    const store = useStore();
    const db = firebase.firestore();

    onBeforeMount(async () => {
      await firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          var docRef = db
            .collection("companies")
            .where("companyEmail", "==", user.email);

          docRef
            .get()
            .then((querySnapshot) => {
              if (!querySnapshot.empty) {
                querySnapshot.forEach((doc) => {
                  store.commit("authUser", {
                    userType: "company",
                    userName: doc.data().companyName,
                    userEmail: doc.data().companyEmail,
                  });
                });
              } else {
                db.collection("employee")
                  .where("employeeEmail", "==", user.email)
                  .get()
                  .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                      store.commit("authUser", {
                        userType: "employee",
                        userName: doc.data().employeeName,
                        userEmail: doc.data().employeeEmail,
                      });
                    });
                  });
              }
            })
        } else {
          store.commit("authLogout");
        }
      });
    });
  },
};
</script>
<style>
* {
  font-family: "Baloo Bhaijaan 2", cursive;
}
</style>
