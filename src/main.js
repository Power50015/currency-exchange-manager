import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./assets/tailwind.css";
import "animate.css";
import WOW from "wow.js";

new WOW({
  boxClass: "animate__animated",
}).init();

createApp(App).use(store).use(router).mount("#app");
