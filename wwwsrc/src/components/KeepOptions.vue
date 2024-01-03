<template>
  <!-- Original Button -->
  <!-- <button class="btn btn-outline-info hide keep-options">...</button> -->

  <div class="hide">
    <button class="btn btn-outline-info hide keep-options" data-toggle="dropdown">...</button>
    <div class="dropdown-menu" v-bind:class="{ 'dropdown-menu-right': isLastColumn }">
      <a class="dropdown-item" @click="viewKeep">View</a>
      <a class="dropdown-item" v-if="isNotHomeView" @click="deleteKeep">Delete</a>
      <a class="dropdown-item" v-if="isVaultsView" @click="removeKeepFromVault">Remove From Vault</a>
      <a class="dropdown-item" v-if="isNotHomeView" @click="togglePublic">{{ publicToggleText }}</a>
    </div>
  </div>

</template>


<script>
  export default {
    name: 'keep-options',
    props: {
      keep: { type: Object, required: true }
    },
    data() {
      return {
        dynamicKeep: null
      }
    },
    computed: {
      currentVault() {
        return this.$store.state.Vaults.currentVault;
      },

      publicToggleText() {
        // let activeKeep = this.$store.state.Keeps.activeKeep;
        let activeKeep = this.activeKeep;

        if (activeKeep) {
          return activeKeep.keep_is_public ? 'Set Private' : 'Set Public';
        } else {
          return '---'
        }

      },
      activeKeep() {
        let storeKeep = this.$store.state.Keeps.activeKeep;
        let dynamicKeep = this.dynamicKeep;
        let activeKeep = null;

        if (storeKeep && dynamicKeep) {
          if (storeKeep.keep_id == dynamicKeep.keep_id) {
            this.dynamicKeep = Object.create(storeKeep);
            return storeKeep;
          }
        }

        if (dynamicKeep) {
          return dynamicKeep;
        }

        return activeKeep;
      },
      isVaultsView() {
        return this.$route.name == 'Vaults';
      },
      isNotHomeView() {
        return this.$route.name !== 'Home';
      }
    },
    methods: {
      isLastColumn() {
        return true
      },
      optionsClick() {
        let activeKeep = this.keep; // Object.create(this.dynamicKeep);
        this.$store.commit("setActiveKeep", activeKeep);
      },
      togglePublic() {
        let keep = this.keep; // new Object.create(this.dynamicKeep);

        let isPublic = keep.keep_is_public;

        keep.keep_is_public = !isPublic;

        this.$store.dispatch("editKeep", keep);
      },
      async removeKeepFromVault() {
        let vaultKeep = {
          vault_id: this.currentVault.vault_id,
          keep_id: this.dynamicKeep.keep_id,
          user_id: "no-user_id"
        }

        let payload = {
          vaultKeep: vaultKeep,
          keep: this.dynamicKeep
        }

        await this.$store.dispatch("removeKeepFromVault", payload);
      },
      deleteKeep() {
        this.$store.dispatch("deleteKeep", this.dynamicKeep);
      },
      viewKeep() {
        this.$router.push({ name: "Keep", params: { keepId: this.keep.keep_id } });
      }
    },
    mounted() {
      this.dynamicKeep = this.keep;
    }
  }
</script>


<style scoped>
  .keep-options {
    position: absolute;
    bottom: 5px;
    right: 5px;
    border-radius: 5px;
    border-bottom-right-radius: 10px;
    border-top-left-radius: 32px;
  }

  a {
    cursor: pointer;
  }
</style>