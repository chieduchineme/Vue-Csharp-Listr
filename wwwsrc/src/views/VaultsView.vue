<template>
  <div class="vaults-view" id="vaults-view">
    <span class="open-slide-out" @click="openSlider">&#9776;</span>
    <slide-out ref="VaultsSlider">
      <vault-list-item v-for="vault in vaults" :key="'vault-id-' + vault.vault_id" :vault="vault" />
    </slide-out>
    <!-- Vaults Header -->
    <div :style="headerOffset" id="vaults-view-header" class="vaults-view-header" v-if="vault && current">
      <div class="vvh-row">
        <click-edit class="vault-name" :initialValue="vault.vault_name" :placeHolder="'Valut Name...'"
          :enterKeyPress="saveVaultName" v-if="current" />
        <div class="vault-keep-count" v-if="vault && current">
          {{ keepsCount }} Keeps
        </div>
      </div>

      <div class="vvh-row">
        <click-edit :initialValue="vault.vault_description" :placeHolder="'Valut Description...'"
          :enterKeyPress="saveVaultDescripton" v-if="current" />
        <button class="vault-button btn btn-warning" @click="deleteVault">Remove Vault</button>
        <button class="vault-button btn btn-primary" @click="createVault">New Vault</button>
        <button class="new-keep-button btn btn-success" @click="createNewKeepInThisVault">&#43;</button>
      </div>

    </div>
    <keeps-container :parentId="'vaults-view'" />
    <!-- Vault Keeps -->
  </div>
</template>

<script>
  export default {
    name: 'vaults-view',
    data() {
      return {
        current: false,
        keepsCount: 0
      }
    },
    computed: {
      vaults() {
        return this.$store.state.Vaults.currentUserVaults
      },
      vault() {
        return this.$store.state.Vaults.currentVault;
      },
      headerOffset() {
        return {
          top: `${this.$store.state.Settings.display.navBarHeight}px`
        }
      },
      keeps() {
        return this.$store.state.Keeps.keeps;
      }
    },
    watch: {
      vault() {
        this.reload();
      },
      keeps() {
        this.reload();
      }
    },
    methods: {
      reload() {
        setTimeout(() => {
          this.current = false;
          this.$forceUpdate();
          this.keepsCount = null;
        }, 0);

        setTimeout(() => {
          this.current = true;
          this.$forceUpdate();
          this.keepsCount = this.vault.vault_keep_count;
        }, 0);
      },
      openSlider() {
        this.$refs.VaultsSlider.openSlider();
      },
      saveVaultName(newValue) {

      },
      saveVaultDescripton(newValue) {

      },
      createNewKeepInThisVault() {
        this.$store.dispatch("showNewKeepForVault", this.MODAL_USAGE.KEEP);
      },
      deleteVault() {
        this.$store.dispatch("deleteVault", this.vault);
      },
      createVault() {
        this.showModal(this.MODAL_USAGE.VAULT);
      }
    }
  }
</script>

<style scoped>
  .open-slide-out {
    margin-left: 15px;
    float: left;
    font-size: 30px;
    cursor: pointer
  }

  .vaults-view-header {
    margin-left: 15px;
    margin-right: 15px;
    display: flex;
    flex-direction: column;
  }

  .vault-name {
    font-size: 1.7em;
  }

  .vault-keep-count {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;
    min-width: 75px;
    max-width: 75px;
    padding: 5px;
    border-radius: 10px;
    background-color: var(--keep-count-color);
    color: rgba(255, 255, 255, 0.664);
  }

  .new-keep-button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;
    min-width: 75px;
    max-width: 75px;
    height: 32px !important;
    font-size: 1.9em;
  }

  .vault-button {
    margin-right: 5px;
    width: auto;
    height: 32px !important;
    width: 200px !important;
  }

  .vvh-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 8px;
  }
</style>