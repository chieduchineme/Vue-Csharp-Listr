import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Store Modules
import Auth from './store-modules/auth.js';
import Keeps from './store-modules/keeps.js';
import Modal from './store-modules/modal.js';
import Settings from './store-modules/settings.js';
import UserKeeps from './store-modules/user-keeps.js';
import Vaults from './store-modules/vaults.js';

export default new Vuex.Store({
  modules: {
    Auth,
    Keeps,
    Modal,
    Settings,
    UserKeeps,
    Vaults
  }
})
