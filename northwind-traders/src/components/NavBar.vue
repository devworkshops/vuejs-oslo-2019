<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand href="#">Northwind Traders</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <ul class="navbar-nav mr-auto">
        <router-link to="/" tag="li" :exact="true" class="nav-item" active-class="active">
          <a class="nav-link">Home</a>
        </router-link>
        <router-link to="/suppliers" tag="li" class="nav-item" active-class="active">
          <a class="nav-link">Suppliers</a>
        </router-link>
      </ul>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {};
</script>

<style scoped>
.nav > .container {
  min-height: 56px;
}
</style>