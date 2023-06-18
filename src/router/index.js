import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LogInView from "../views/LogInView.vue";
import RegisterView from "../views/RegisterView.vue";
import Session from "supertokens-web-js/recipe/session";
import ProfileView from "../views/ProfileView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/profile",
      name: "profile",
      component: ProfileView,
      beforeEnter: enterIfLoggedIn,
    },
    {
      path: "/create",
      name: "create",
      component: () => import("@/views/CreatePuzzleView.vue"),
      beforeEnter: enterIfLoggedIn,
    },
    {
      path: "/play/:puzzleid",
      name: "puzzle",
      component: () => import("../views/PlayView.vue"),
    },
    {
      path: "/play",
      name: "play",
      component: () => import("../views/PlaySearchView.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
      beforeEnter: leaveIfLoggedIn,
    },
    {
      path: "/login",
      name: "login",
      component: LogInView,
      beforeEnter: leaveIfLoggedIn,
    },
    {
      name: "logout",
      path: "/logout",
      beforeEnter: async () => {
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

async function enterIfLoggedIn(to, from, next) {
  if (
    (await Session.doesSessionExist()) ||
    (await Session.attemptRefreshingSession())
  ) {
    next();
  } else {
    next("/");
  }
}

async function leaveIfLoggedIn(to, from, next) {
  if (
    (await Session.doesSessionExist()) ||
    (await Session.attemptRefreshingSession())
  ) {
    next("/");
  } else {
    next();
  }
}

export default router;
