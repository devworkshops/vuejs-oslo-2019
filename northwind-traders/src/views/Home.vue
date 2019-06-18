<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
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
