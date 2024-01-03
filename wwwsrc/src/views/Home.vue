<template>
  <div class="home" id="home">
    <!-- <button v-if="user.user_id" @click="logout">logout</button>
    <router-link v-else :to="{name: 'login'}">Login</router-link> -->
    <router-link v-if="!user.user_id" :to="{name: 'login'}">Login</router-link>
    <keeps-container :keeps="keeps" :parentId="'home'" />
  </div>
</template>

<script>
  export default {
    name: "home",
    computed: {
      user() {
        return this.$store.state.Auth.user;
      },
      keeps() {
        return this.$store.state.Keeps.keeps;
      }
    },
    methods: {
      logout() {
        this.$store.dispatch("logout");
      },
      resizeWindow() {
        this.$store.dispatch("resizeWindow");
      }
    }
  };
</script>