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
  height: fit-content;
  padding-bottom: 1rem;
  background-color: #4158d0;
  background-image: linear-gradient(
    43deg,
    #4158d0 0%,
    #c850c0 46%,
    #ffcc70 100%
  );
}

.btn:focus {
  box-shadow: none !important;
}

@-webkit-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-moz-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@-0-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
