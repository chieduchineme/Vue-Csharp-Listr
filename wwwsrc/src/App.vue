<template>
  <div id="app">
    <nav-bar />
    <div id="content">
      <router-view />
    </div>

    <modal v-show="modalShow">
      <user-modal v-if="modalUsage === MODAL_USAGE.USER" />
      <new-keep-modal v-if="modalUsage === MODAL_USAGE.KEEP" />
      <vault-modal v-if="modalUsage === MODAL_USAGE.VAULT" />
    </modal>
  </div>
</template>

<script>
  export default {
    name: "app",
    mounted() {
      // This makes is so the content starts 20px below the nav-bar
      let navBar = document.getElementById('nav-bar');
      let navBarPadding = `${navBar.clientHeight + 20}px`;
      document.body.style.paddingTop = navBarPadding;
      this.$store.commit("setNavBarHeight", navBar.clientHeight);
    },
    computed: {

      modalUsage() {
        return this.$store.state.Modal.modalUsage;
      },
      modalShow() {
        return this.$store.state.Modal.show;
      }
    }
  }
</script>

<style>
  ::-webkit-scrollbar {
    display: none;
  }

  :root {
    --info-border: rgb(0, 180, 69);
    --info-bg: rgba(255, 255, 255, 0.507);
    --info-height: 40px;
    --keep-count-color: rgb(253, 34, 71);
    --keep-tag-color: rgb(245, 245, 79);
    --keep-view-count-color: rgb(1, 111, 255);
  }

  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }
</style>