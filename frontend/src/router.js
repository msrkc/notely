import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Notes from "./views/Notes.vue";
import * as auth from "./auth";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      beforeEnter: (to, from, next) => {
        if (!auth.isLoggedIn()) {
          next();
        } else {
          next({ name: "notes" });
        }
      }
    },
    {
      path: "/pad",
      name: "notes",
      component: Notes,
      beforeEnter: (to, from, next) => {
        if (auth.isLoggedIn()) {
          next();
        } else {
          next({ name: "home" });
        }
      }
    }
  ]
});
