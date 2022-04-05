import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    // route level code-splitting
    // this generates a separate chunk (home.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
  },
  {
    path: "/CompanyLogin",
    name: "CompanyLogin",
    component: () => import("../views/CompanyLogin.vue"),
  },
  {
    path: "/CompanyRegister",
    name: "CompanyRegister",
    component: () => import("../views/CompanyRegister.vue"),
  },
  {
    path: "/EmployeeLogin",
    name: "EmployeeLogin",
    component: () => import("../views/EmployeeLogin.vue"),
  },
  {
    path: "/EmployeeCRUD",
    name: "EmployeeCRUD",
    component: () => import("../views/EmployeeCRUD.vue"),
  },
  {
    path: "/AddressCRUD",
    name: "AddressCRUD",
    component: () => import("../views/AddressCRUD.vue"),
  },
  {
    path: "/AddressAdd",
    name: "AddressAdd",
    component: () => import("../views/AddressAdd.vue"),
  },
  {
    path: "/CurrencyExchange",
    name: "CurrencyExchange",
    component: () => import("../views/CurrencyExchange.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
