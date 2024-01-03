import Vue from 'vue'
import Router from 'vue-router'
import Store from './store.js'

// Import all "Views" here
// @ts-ignore
import Home from './views/Home.vue'
// @ts-ignore
import KeepView from './views/KeepView.vue';
// @ts-ignore
import Login from './views/Login.vue'
// @ts-ignore
import UserView from './views/UserView.vue';
// @ts-ignore
import VaultsView from './views/VaultsView.vue';

Vue.use(Router, Store)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      beforeEnter(to, from, next) {
        Store.dispatch("getLoggedInUserVaults");
        Store.dispatch("getAllKeeps");
        next();
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/keeps/:keepId',
      name: 'Keep',
      component: KeepView,
      props: true,
      beforeEnter(to, from, next) {
        Store.dispatch("setActiveKeepById", to.params.keepId);
        next();
      }
    },
    {
      path: '/user/:userId',
      name: 'Keeps',
      component: UserView,
      props: true,
      beforeEnter(to, from, next) {
        Store.dispatch("getLoggedInUserVaults"); // store-modules > vaults.js
        Store.dispatch("getUserKeeps"); // store-modules > user-keeps.js
        next();
      }
    },
    {
      path: '/user/:userId/vaults',
      name: 'Vaults',
      component: VaultsView,
      props: true,
      beforeEnter(to, from, next) {
        Store.dispatch("getLoggedInUserVaults"); // store-modules > vaults.js
        Store.dispatch("loadKeepsForCurrentVault");
        next();
      }
    }
  ]
})
