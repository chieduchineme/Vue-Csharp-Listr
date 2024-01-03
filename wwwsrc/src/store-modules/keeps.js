import Axios from 'axios';
import Vue from 'vue';

const CONTROLLER_ROUTE = 'api/keeps';

let base = window.location.host.includes("localhost:8080")
  ? "https://localhost:5001/"
  : "/";

let api = Axios.create({
  baseURL: base + CONTROLLER_ROUTE,
  timeout: 3000,
  withCredentials: true
});

export default {
  state: {
    activeKeep: null, // This is a Keep object {}
    keeps: []
  },
  mutations: {
    createKeep(state, keep) {
      state.keeps.push(keep);
    },
    getAllKeeps(state, keeps) {
      Vue.set(state, 'keeps', keeps);
    },
    setActiveKeep(state, keep) {
      state.activeKeep = keep;
    },
    editKeep(state, keep) {
      let keepId = keep.keep_id;
      let keepIndex = state.keeps.findIndex(keep => {
        return keep.keep_id == keepId
      });
      state.keeps.splice(keepIndex, 1, keep);
    },
    deleteKeep(state, keep) {
      let index = state.keeps.findIndex(k => k.keep_id == keep.keep_id);

      if (index > -1) {
        state.keeps.splice(index, 1);
      }
    }
  },
  actions: {
    async createKeep({ commit, dispatch, rootState }, keep) {
      try {
        let axiosResponse = await api.post("", keep);

        if (axiosResponse) {
          let keepId = axiosResponse.data;

          let endPoint = `${keepId}`;

          axiosResponse = await api.get(endPoint);

          if (axiosResponse) {
            let newKeep = axiosResponse.data;
            commit("createKeep", newKeep);
            commit("setActiveKeep", newKeep);

            if (keep.vault_id) {
              let activeVault = rootState.Vaults.currentVault;

              let vaultKeepMap = {
                vault_id: keep.vault_id,
                keep_id: newKeep.keep_id,
                user_id: "fake-user"
              }

              dispatch("addKeepToVaultFromVaultsView", vaultKeepMap); // This dispatches getAllKeeps
              dispatch("setActiveVault", activeVault);
              dispatch("getVaultKeeps", activeVault.vault_id);

              rootState.Modal.addNewKeepToVault = false;
            }
          }
        }
      } catch (error) {
        console.warn("store-modules > keeps.js > actions > createKeep()")
        console.error(error)
      }
    },
    async getAllKeeps({ commit, dispatch }) {
      try {
        let axiosResponse = await api.get("");
        if (axiosResponse) {
          commit("getAllKeeps", axiosResponse.data);
        }
      } catch (error) {
        console.warn("store-modules > keeps.js > actions > getAllKeeps()");
        console.error(error);
      }
    },

    async editKeep({ commit }, keep) {
      try {
        let endPoint = `${keep.keep_id}`;
        let axiosResponse = await api.put(endPoint, keep);
        let newKeep = axiosResponse.data;

        commit("editKeep", newKeep);
        commit("setActiveKeep", newKeep);
      } catch (error) {
        console.warn("store-modules > keeps.js > actions > editKeep()");
        console.error(error);
      }
    },

    async deleteKeep({ commit }, keep) {
      try {
        let endPoint = `${keep.keep_id}`;
        await api.delete(endPoint);

        commit("deleteKeep", keep);
        commit("setActiveKeep", null);

      } catch (error) {
        console.warn("store-modules > keeps.js > actions > deleteKeep()");
        console.error(error);
      }
    },

    async setActiveKeepById({ commit, state }, keepId) {
      try {
        // Quickly Show the user the keep
        let activeKeep = state.keeps.find(keep => {
          return keep.keep_id == keepId
        })

        if (activeKeep) {
          commit("setActiveKeep", activeKeep);
        }

        // Edit the keep on the server and reset the active keep
        // so the user sees the keep count go up
        let endPoint = `${keepId}/view`;
        let axiosResponse = await api.put(endPoint);
        if (axiosResponse) {
          let keep = axiosResponse.data;
          commit("setActiveKeep", keep);
          commit("editKeep", keep); // This updates the keeps collection
        }
      } catch (error) {
        console.warn("store-modules > keeps.js > actions > setActiveKeepById()");
        console.error(error);
      }
    },

    async getUserKeeps({ commit, rootState }) {
      try {
        let userId = rootState.Auth.user.user_id;

        let endPoint = `user`
        let axiosResponse = await api.get(endPoint);
        let keeps = axiosResponse.data;

        // let keeps = rootState.Keeps.keeps;

        let userKeeps = keeps.filter(keep => {
          return keep.user_id === userId;
        });
        commit("getAllKeeps", userKeeps);
      } catch (error) {
        console.warn("store-modules > keeps.js > actions > getUserKeeps()");
        console.error(error);
      }
    },

    async createKeepInCurrentVault({ commit, dispatch, rootState }, keep) {
      try {
        // Create Keep
        let axiosResponse = await api.post("", keep);

        // Get Keep
        let keepId = axiosResponse.data;
        let endPoint = `${keepId}`;
        axiosResponse = await api.get(endPoint);
        let newKeep = axiosResponse.data;

        // Make vault-keep-map object
        let vaultKeepMap = {
          vault_id: keep.vault_id,
          keep_id: newKeep.keep_id,
          user_id: "fake-user"
        }

        // AddKeepToVault
        await dispatch("addKeepToVaultFromVaultsView", vaultKeepMap); // This dispatches getAllKeeps

        // Get Logged in user vaults to update the count
        await dispatch("getLoggedInUserVaults");

        // Add the new keep to the keeps
        commit("createKeep", newKeep);

        // Reset the 
        rootState.Modal.addNewKeepToVault = false;
      } catch (error) {
        console.warn("store-modules > keeps.js > actions > createKeepInCurrentVault()");
        console.error(error);
        rootState.Modal.addNewKeepToVault = false;
      }
    }
  }
}