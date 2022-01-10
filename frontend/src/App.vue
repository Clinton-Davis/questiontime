<template>
  <div id="nav">
    <Navbar />
  </div>
  <router-view />
</template>

<script>
export default {
  name: "App",
};
</script>
<script setup>
import Navbar from "./components/Navbar.vue";
</script>
<style>
body {
  font-family: "Noto Sans JP", sans-serif;
  font-weight: 300;
}
.btn:focus {
  box-shadow: none !important;
}
</style>
