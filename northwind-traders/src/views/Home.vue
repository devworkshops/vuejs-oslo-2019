<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"></HelloWorld>
    <MyCounter></MyCounter>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import MyCounter from "@/components/MyCounter.vue";

export default {
  name: "home",
  components: {
    HelloWorld,
    MyCounter
  }
};
</script>
