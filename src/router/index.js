import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/login.vue";
import { useTodoStore } from "../store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      meta: { requiresAuth: false },
      component: HomeView,
    },
    {
      path: "/register",
      name: "register",
      meta: { requiresAuth: false },
      component: () => import("../views/register.vue"),
    },
    {
      path: "/links",
      name: "links",
      meta: { requiresAuth: true },
      component: () => import("../views/links.vue"),
    },
    {
      path: "/profileDet",
      name: "profileDet",
      meta: { requiresAuth: true },
      component: () => import("../views/profileDet.vue"),
    },
    {
      path: "/preview",
      name: "preview",
      meta: { requiresAuth: true },
      component: () => import("../views/preview.vue"),
    },
  ],
});

router.beforeEach((to, from) => {
  const store = useTodoStore();
  if (to.meta.requiresAuth && !store.user) return "/";
});

export default router;
