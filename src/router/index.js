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
    path: "/EmployeeLogin",
    name: "EmployeeLogin",
    component: () => import("../views/EmployeeLogin.vue"),
  },
  {
    path: "/EmployeeCRUD",
    name: "EmployeeCRUD",
    component: () => import("../views/EmployeeCRUD.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
