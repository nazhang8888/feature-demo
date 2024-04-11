import MainLayout from "layouts/MainLayout.vue";

const routes = [
  {
    name: "Home",
    path: "/",
    component: () => import("pages/IndexPage.vue"),
    meta: { layout: MainLayout, icon: "public" },
  },
  {
    name: "Todo's",
    path: "/todo",
    component: () => import("pages/TodoPage.vue"),
    meta: { layout: MainLayout, icon: "check_circle" },
  },
  {
    name: "Table",
    path: "/table",
    component: () => import("pages/TablePage.vue"),
    meta: { layout: MainLayout, icon: "table_view" },
  },
  {
    name: "Settings",
    path: "/settings",
    component: () => import("pages/SettingsPage.vue"),
    meta: { layout: MainLayout, icon: "settings" },
  },
  {
    name: "Error",
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
    meta: { layout: MainLayout, icon: "question_mark" },
  },
];

export default routes;
