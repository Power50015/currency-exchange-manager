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
  ],
});

export default router;
