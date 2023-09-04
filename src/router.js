import { createRouter, createWebHistory } from "vue-router";
import AppHome from "./pages/AppHome.vue";
import AppAbout from "./pages/AppAbout.vue";
import AppCart from "./pages/AppCart.vue";
import App404 from "./pages/App404.vue";
import AppMenu from "./pages/AppMenu.vue";
import AppContact from "./pages/AppContact.vue";

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: "/",
      name: "home",
      component: AppHome,
    },
    {
      path: "/about",
      name: "about",
      component: AppAbout,
    },
    {
      path: "/contact",
      name: "contact",
      component: AppContact,
      props: true,
    },
    {
      path: "/menu",
      name: "menu",
      component: AppMenu,
    },
    {
      path: "/cart",
      name: "cart",
      component: AppCart,
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
