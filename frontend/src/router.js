import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/apuntes",
      name: "apuntes",
      component: () => import("./components/ApuntesList"),
    },
    {
      path: "/apuntes/:id",
      name: "apunte-details",
      component: () => import("./components/Apunte"),
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/AddApunte"),
    },
  ],
});
