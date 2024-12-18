import { createRouter, createWebHistory } from "vue-router";
import SemesterView from "../views/SemesterView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "semesters",
      component: SemesterView,
    },
    {
      path: "/classes",
      name: "classes",
      component: () => import("../views/ClassView.vue"),
    },
  ],
});

export default router;
