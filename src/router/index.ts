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
  ],
});

export default router;
