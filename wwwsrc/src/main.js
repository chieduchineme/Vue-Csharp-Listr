import Vue from 'vue';
// @ts-ignore
import App from './App.vue';
import AuthService from "./auth-service.js";
import router from './router.js';
import store from './store.js'; // This imports all the store modules from ./store-modules
import './global-components.js'; // This imports and registers all the global components

// These mixins get added to every Vue component
Vue.mixin({
  data() {
    return {
      MODAL_USAGE: {
        NONE: 0,
        USER: 1,
        KEEP: 2,
        VAULT: 3
      }
    }
  },
  methods: {
    userId() {
      return this.$store.state.Auth.user.user_id;
    },
    isAllowed(creatorId) {
      let currentUserId = this.$store.state.Auth.user.user_id;
      let result = creatorId === currentUserId;
      return result;
    },
    showModal(modalUsage) {
      this.$store.dispatch("showModal", modalUsage);
    },
    closeModal() {
      this.$store.dispatch("closeModal");
    }
  }
});

async function init() {
  let user = await AuthService.Authenticate()
  if (user) { store.commit("setUser", user) }
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}

init();