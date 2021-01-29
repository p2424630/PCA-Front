import { createWebHistory, createRouter } from "vue-router";
import Exercises from "@/views/Exercises.vue";
import Calculator from "@/views/Calculator.vue";
import NotFound from "@/views/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "home",
    redirect: "/exercises"
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
    // redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
