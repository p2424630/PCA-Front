import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import Calc from "@/views/Calc.vue";
import NotFound from "@/views/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/calc",
    name: "calc",
    component: Calc,
  },
  {
    path: "/:catchAll(.*)",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
