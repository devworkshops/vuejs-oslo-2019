<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand href="#">Northwind Traders</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="mr-auto" v-if="isLoggedIn">
        <router-link to="/" tag="li" :exact="true" class="nav-item" active-class="active">
          <a class="nav-link">Home</a>
        </router-link>
        <router-link to="/suppliers" tag="li" class="nav-item" active-class="active">
          <a class="nav-link">Suppliers</a>
        </router-link>
        <router-link to="/categories" tag="li" class="nav-item" active-class="active">
          <a class="nav-link">Categories</a>
        </router-link>
        <router-link to="/products" tag="li" class="nav-item" active-class="active">
          <a class="nav-link">Products</a>
        </router-link>
        <router-link to="/about" tag="li" class="nav-item" active-class="active">
          <a class="nav-link">About</a>
        </router-link>
      </b-navbar-nav>
      <b-navbar-nav class="mr-auto" v-if="isLoggedIn">
        <b-nav-item @click="logout()">
          <i class="fas fa-sign-out-alt"></i> Logout
        </b-nav-item>
        <b-nav-item v-b-toggle.collapseNotifications>
          Notifications
          <b-badge>{{$store.getters.notificationCount}}</b-badge>
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="mr-auto" v-else>
        <router-link to="/login" tag="li" class="nav-item" active-class="active">
          <a class="nav-link">
            <i class="fas fa-sign-in-alt"></i> Login
          </a>
        </router-link>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { AuthService } from "@/services/NorthwindService.js";

export default {
  props: {
    user: Object
  },
  computed: {
    isLoggedIn() {
      return !!this.user;
    }
  },
  methods: {
    logout() {
      AuthService.logout();
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.nav > .container {
  min-height: 56px;
}
</style>