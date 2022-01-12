<template>
  <nav class="navbar navbar-expand-lg navbar navbar-dark bg-dark my-navbar">
    <div class="container">
      <router-link class="navbar-brand" :to="{ name: 'home' }"
        >Questions Time</router-link
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a href="/accounts/logout/" class="btn btn-outline-primary"
              >Logout</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style scoped>
.navbar-brand {
  font-weight: bold;
  font-size: 1.7rem;
  -webkit-text-stroke: 0.001rem #3904f7;
}
.navbar-brand:hover,
.navbar-brand:active {
  -webkit-text-stroke: 0.001rem #ffffff;
  color: #fd0019;
}
</style>
