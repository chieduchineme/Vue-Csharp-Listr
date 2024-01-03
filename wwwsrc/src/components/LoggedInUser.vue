<template>
  <div class="logged-in-user dropdown" v-if="!isLogin">
    <h3>{{ user.user_username }}</h3>
    <div data-toggle="dropdown">
      <user-icon class="u-icon" :user="user" />
    </div>
    <div class="dropdown-menu">
      <a class="dropdown-item" @click="editUser">Edit</a>
      <a class="dropdown-item" @click="logout">Logout</a>
      <a class="dropdown-item nk-btn orange" @click="goToKeepsView">Your Keeps</a>
      <a class="dropdown-item nk-btn yellow" @click="goToVaultsView">Your Vaults</a>
      <a class="dropdown-item nk-btn green" @click="newKeep">New Keep</a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "logged-in-user",
    computed: {
      user() {
        return this.$store.state.Auth.user;
      },
      isLogin() {
        let result = this.$route.name == "login";
        return result;
      }
    },
    methods: {
      editUser() {
        this.showModal(this.MODAL_USAGE.USER); // main.js Vue.mixins
      },
      logout() {
        this.$store.dispatch("logout");
      },
      goToKeepsView() {
        this.$router.push({ name: 'Keeps', params: { userId: this.userId() } });
      },
      goToVaultsView() {
        this.$router.push({ name: 'Vaults', params: { userId: this.userId() } });
      },
      newKeep() {
        this.$store.dispatch("showModal", this.MODAL_USAGE.KEEP);
      }
    }
  };
</script>


<style scoped>
  .logged-in-user {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    align-content: center;
    justify-content: flex-start;
  }

  .u-icon {
    cursor: pointer;
    min-height: 46px !important;
    min-width: 46px !important;
    max-height: 46px !important;
    max-width: 46px !important;
  }

  a {
    cursor: pointer;
  }

  h2,
  h3 {
    margin-top: 10px;
    margin-right: 10px;
  }

  .green {
    background-color: rgb(48, 221, 48);
  }

  .yellow {
    background-color: rgb(207, 226, 38);
  }

  .orange {
    background-color: rgb(255, 145, 0);
  }

  .nk-btn {
    color: rgba(255, 255, 255, 0.808);
    border-radius: 5px;
    margin: 5px;
    width: 93%;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.808);
  }

  .nk-btn:hover {
    box-shadow: 2px 2px 8px black;
  }
</style>