import MainLayout from "layouts/MainLayout.vue";

const routes = [
  {
    name: "Home",
    path: "/",
    component: () => import("pages/IndexPage.vue"),
    meta: { layout: MainLayout },
  },
  {
    name: "Todo's",
    path: "/todo",
    component: () => import("pages/TodoPage.vue"),
    meta: { layout: MainLayout },
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
