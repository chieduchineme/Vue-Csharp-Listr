import Vue from "vue";

export default {
  state: {
    userKeeps: []
    // userKeepsColumns: {
    //   // 0: [ Array of keeps ],
    //   // 1: [ Array of keeps ]
    // }
  },
  mutations: {
    setUserKeeps(state, userKeeps) {
      state.userKeeps = userKeeps;
    }
    // setUserKeepsColumns(state, userKeepsColumns) {
    //   Vue.set(state, "userKeepsColumns", userKeepsColumns);
    // }
  },
  actions: {
    // setUserKeepsColumns({ commit, dispatch, state, rootState }) {
    //   dispatch("setUserViewColumnCount"); // This is in store-modules > settings.js

    //   let columnCount = rootState.Settings.display.columnCount;

    //   // We are assuming that the userKeeps is up to date.
    //   let keeps = state.userKeeps;
    //   let keepsColumns = {};

    //   // Create all the keys with a cooresponding array
    //   for (let i = 0; i < columnCount; i++) {
    //     keepsColumns[i] = []
    //   };

    //   // Add all the keeps to the columns
    //   for (let i = 0; i < keeps.length; i++) {
    //     let key = i % columnCount;
    //     keepsColumns[key].push(keeps[i]);
    //   };

    //   commit("setUserKeepsColumns", keepsColumns);
    // },

    // Pass 'rootState' in order to get access to other store modules
    // EXAMPLE: rootState.ModuleName.statePropertyName

  }

}