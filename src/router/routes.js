import IndexPage from "pages/IndexPage.vue";
import MainLayout from "layouts/MainLayout.vue";
import TodoPage from "src/pages/TodoPage.vue";
const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "",
        component: IndexPage,
      },
      {
        path: "todo",
        component: TodoPage,
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
