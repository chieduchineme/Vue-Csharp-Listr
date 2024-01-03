<template>
  <!-- <button class="btn btn-outline-danger hide save-keep">Keep</button> -->
  <div class="hide save-keep" v-if="userId()">
    <button class="btn btn-outline-danger save-keep" data-toggle="dropdown">Keep</button>
    <div class="dropdown-menu" v-bind:class="{ 'dropdown-menu-right': isLastColumn }">
      <a class="dropdown-item" @click="createNewVault">New Vault...</a>
      <a v-for="vault in vaults" :key="vault.vault_id" class="dropdown-item"
        @click="addKeepToVault(vault.vault_id)">{{ vault.vault_name }}</a>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  export default {
    name: 'save-keep',
    props: {
      keep: { type: Object, required: true }
    },
    computed: {
      vaults() {
        return this.$store.state.Vaults.currentUserVaults;
      },
      isLastColumn() {
        return true;
      }
    },
    methods: {
      createNewVault() {
        let payload = {
          modalUsage: this.MODAL_USAGE.VAULT,
          newValutKeep: this.keep
        }
        this.$store.dispatch("showCreateNewVaultForKeep", payload);
      },
      addKeepToVault(vaultId) {
        let vaultKeepMap = {
          vault_id: vaultId,
          keep_id: this.keep.keep_id,
          user_id: this.userId()
        };
        this.$store.dispatch("addKeepToVault", vaultKeepMap);
      }
    }
  }
</script>


<style scoped>
  .save-keep-container {
    position: relative;
  }

  /* .save-keep {
    position: absolute;
    top: 5px;
    right: 5px;
    border-radius: 5px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 32px;
  } */
  .save-keep {
    position: absolute;
    top: 3px;
    right: 3px;
    border-radius: 5px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 32px;
  }

  .save-button {
    border-radius: 5px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 32px;
  }

  a {
    cursor: pointer;
  }
</style>