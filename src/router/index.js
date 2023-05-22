import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LogInView from "../views/LogInView.vue";
import RegisterView from "../views/RegisterView.vue";
import PlayView from "../views/PlayView.vue";
import Session from "supertokens-web-js/recipe/session"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/lemodi",
      name: "lemodi",
      component: PlayView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/login",
      name: "login",
      component: LogInView,
      beforeEnter: async (to, from, next) => {
        if (await Session.doesSessionExist()) {
          console.log("session exists");
          next("/");
        } else {
          const res = await Session.attemptRefreshingSession();
          console.log(res);
          next();
        }
      }
    },
    {
      name: "logout",
      path: "/logout",
      beforeEnter: async (to, from, next) => {
        if (await Session.doesSessionExist()) {
          await Session.signOut();
        }
        window.location.href = "/login";
      },
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
