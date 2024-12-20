import { createRouter, createWebHashHistory } from "vue-router";
import SemesterView from "../views/SemesterView.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
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
    {
      path: "/classes/students",
      name: "students",
      component: () => import("../views/StudentsView.vue"),
    },
  ],
});

export default router;
