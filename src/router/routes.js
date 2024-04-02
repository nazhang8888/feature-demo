import MainLayout from "layouts/MainLayout.vue";

const routes = [
  {
    name: "Home",
    path: "/",
    component: () => import("pages/IndexPage.vue"),
    meta: { layout: MainLayout, icon: "home" },
  },
  {
    name: "Todo's",
    path: "/todo",
    component: () => import("pages/TodoPage.vue"),
    meta: { layout: MainLayout, icon: "check" },
  },
  {
    name: "Error",
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
    meta: { layout: MainLayout, icon: "question_mark" },
  },
];

export default routes;
