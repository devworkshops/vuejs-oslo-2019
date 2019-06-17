import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import NotFound from "./views/NotFound.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      component: () => import("./views/About.vue")
    },
    {
      path: "/suppliers",
      name: "suppliers",
      component: () => import("./views/Suppliers/SupplierList.vue")
    },
    {
      path: "/suppliers/new",
      name: "suppliers-new",
      component: () => import("./views/Suppliers/SupplierEdit.vue")
    },
    {
      path: "/suppliers/:id",
      name: "suppliers-edit",
      component: () => import("./views/Suppliers/SupplierEdit.vue"),
      props: true
    },
    {
      path: "**",
      name: "NotFound",
      component: NotFound
    }
  ]
});
