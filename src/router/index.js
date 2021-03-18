import { createWebHistory, createRouter } from "vue-router";
import Exercises from "@/views/Exercises.vue";
import Calculator from "@/views/Calculator.vue";
import NotFound from "@/views/NotFound.vue";
import Home from "@/views/Home.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/exercises",
    name: "exercises",
    component: Exercises,
  },
  {
    path: "/calculator",
    name: "calculator",
    component: Calculator,
  },
  {
    path: "/:catchAll(.*)",
    name: "not_found",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
