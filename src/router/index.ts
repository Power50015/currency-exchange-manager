import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/company-login",
      name: "CompanyLogin",
      component: () => import("../views/CompanyLoginView.vue"),
    },
    {
      path: "/company-register",
      name: "CompanyRegister",
      component: () => import("../views/CompanyRegisterView.vue"),
    },
    {
      path: "/profile",
      name: "Profile",
      component: () => import("../views/ProfileView.vue"),
    },
    {
      path: "/employeies",
      name: "Employeies",
      component: () => import("../views/EmployeiesView.vue"),
    },
    {
      path: "/login",
      name: "EmployeiesLogin",
      component: () => import("../views/EmployeiesLoginView.vue"),
    },
    {
      path: "/add-address",
      name: "AddAddress",
      component: () => import("../views/AddAddressView.vue"),
    },
    {
      path: "/currency-action",
      name: "CurrencyAction",
      component: () => import("../views/CurrencyActionView.vue"),
    },
    {
      path: "/reservations",
      name: "Reservations",
      component: () => import("../views/ReservationsView.vue"),
    },
  ],
});

export default router;
