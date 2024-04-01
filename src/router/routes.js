import IndexPage from "pages/IndexPage.vue";
import MainLayout from "layouts/MainLayout.vue";
import TodoPage from "src/pages/TodoPage.vue";

const routes = [
  {
    name: "home",
    path: "/",
    component: IndexPage,
    meta: { layout: MainLayout },
  },
  {
    name: "todos",
    path: "/todo",
    component: TodoPage,
    meta: { layout: MainLayout },
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
