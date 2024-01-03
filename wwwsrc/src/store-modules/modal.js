export default {
  state: {
    modalUsage: 0,
    show: false,
    newVaultForExistingKeep: false,
    newValutKeep: null, // This is an object {}
    addNewKeepToVault: false,
    editingVault: false
  },

  mutations: {
    showModal(state, modalUsage) {
      state.show = true;
      state.modalUsage = modalUsage;
    },

    closeModal(state) {
      state.modalUsage = 0;
      state.show = false;
      state.newVaultForExistingKeep = false;
      state.newValutKeep = null;
      state.addNewKeepToVault = false;
    },

    showCreateNewVaultForKeep(state, newValutKeep) {
      state.newVaultForExistingKeep = true;
      state.newValutKeep = newValutKeep;
    },

    showNewKeepForVault(state, modalUsage) {
      state.addNewKeepToVault = true;
      state.modalUsage = modalUsage;
      state.show = true;
    }
  },

  actions: {
    showModal({ commit }, modalUsage) {
      commit("showModal", modalUsage);
    },

    closeModal({ commit }) {
      commit("closeModal");
    },

    showCreateNewVaultForKeep({ commit, dispatch }, payload) {
      let modalUsage = payload.modalUsage;
      let newValutKeep = payload.newValutKeep;

      commit("showCreateNewVaultForKeep", newValutKeep);
      dispatch("showModal", modalUsage);
    },

    showNewKeepForVault({ commit }, modalUsage) {
      commit("showNewKeepForVault", modalUsage);
    }
  }
}