// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/views/HomePage.vue"),
  },
  {
    path: "/create-qr",
    component: () => import("@/views/CreateQrPage.vue"),
  },
  {
    path: "/qr-list",
    component: () => import("@/views/QrListPage.vue"),
  },
  {
    path: "/qr/:id",
    component: () => import("@/views/QrListPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
