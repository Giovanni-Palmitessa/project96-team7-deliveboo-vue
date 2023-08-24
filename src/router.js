import { createRouter, createWebHistory } from "vue-router";
// import AppHome from "./pages/AppHome.vue";

import AppAbout from "./pages/AppAbout.vue";

import App404 from "./pages/App404.vue";

const router = createRouter({
  history: createWebHistory(),

  routes: [
    // {
    //   path: "/",
    //   name: "home",
    //   component: AppHome,
    // },
    {
      path: "/about",
      name: "about",
      component: AppAbout,
    },
    //la 404 deve sempre stare per ultima
    {
      path: "/:pathMatch(.*)*",
      name: "page404",
      component: App404,
    },
  ],
});

export { router };
