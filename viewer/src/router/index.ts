import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        title: "Speckle.js",
      },
    },
  ],
});

router.beforeEach((to) => {
  document.title = (to.meta?.title as string | undefined) || "Speckle.js";
});

export default router;
