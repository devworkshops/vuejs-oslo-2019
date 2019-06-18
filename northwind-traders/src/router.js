import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import NotFound from "./views/NotFound.vue";
import Login from "./views/Login.vue";
import Unauthorized from "./views/Unauthorized.vue";

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
      path: "/categories",
      name: "categories",
      component: () => import("./views/Categories/CategoryList.vue")
    },
    {
      path: "/products",
      name: "products",
      component: () => import("./views/Products/ProductList.vue")
    },
    {
      path: "/products/new",
      name: "products-new",
      component: () => import("./views/Products/ProductEdit.vue")
    },
    {
      path: "/products/:id",
      name: "products-edit",
      component: () => import("./views/Products/ProductEdit.vue"),
      props: true
    },
    {
      path:'/login',
      component: Login
    },
    {
      path:'/unauthorized',
      component: Unauthorized
    },
    {
      path: "**",
      name: "NotFound",
      component: NotFound
    }
  ]
});
