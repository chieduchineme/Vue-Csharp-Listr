<template>
  <!-- <div id="nav-bar" class="nav-bar">

  </div> -->
  <nav id="nav-bar" class="navbar navbar-light bg-light fixed-top justify-space-between">
    <a class="navbar-brand">
      <router-link to="/">listr</router-link>
    </a>

    <div class="page-name">{{ pageName }}</div>

    <form class="form" v-if="userId()">
      <logged-in-user />
    </form>
  </nav>
</template>


<script>
  export default {
    name: 'nav-bar',
    computed: {
      pageName() {
        return this.$route.name;
      }
    }
  }
</script>


<style scoped>
  .nav-bar {
    /* position: fixed;
    top: 0;
    width: 100%; */
  }

  .page-name {
    font-size: 2.32em;
  }
</style>