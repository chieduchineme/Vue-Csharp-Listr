<template>
  <form class="user-form">
    <div class="form-group">
      <label for="user-name">Title</label>
      <input v-model="data.vault_name" type="text" class="form-control" id="user-name" placeholder="Title..." />
    </div>

    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text">Description</span>
      </div>
      <input v-model="data.vault_description" type="text" placeholder="Description..." />
    </div>

    <div class="button-container">
      <button @click.prevent="save" class="btn btn-primary">Ok</button>
      <button @click.prevent="cancel" class="btn btn-primary">Cancel</button>
    </div>
  </form>
</template>


<script>
  export default {
    name: 'vault-modal',
    data() {
      return {
        data: {
          user_id: "THIS-GETS-SET-ON-SERVER",
          vault_name: "",
          vault_description: ""
        },
        editing: false,
        newVaultForExistingKeep: false
      }
    },
    methods: {
      save() {
        // We need to add the keep to the vault if it exists
        // store-modules > vaults.js > state > newValutKeep: {}
        if (this.editing) {
          alert("modals > methods > save: NOT IMPLEMENTED FOR EDITING A VAULT");
          // this.$store.dispatch("editVault", this.vault);
        } else if (this.newVaultForExistingKeep) {
          let payload = {
            vault: this.data,
            keep: this.$store.state.Modal.newValutKeep
          }
          this.$store.dispatch("createVault", payload);
        } else {
          let payload = {
            vault: this.data,
            keep: null
          }
          this.$store.dispatch("createVault", payload);
        };

        this.cancel();
      },
      cancel() {
        this.closeModal();
      }
    },
    mounted() {
      // Check if we are editing the current vault
      this.editing = this.$store.state.Modal.editingVault;
      this.newVaultForExistingKeep = this.$store.state.Modal.newVaultForExistingKeep;

      if (this.editing) {
        let currentVault = this.$store.state.Vaults.currentVault;
        this.data.vault_name = currentVault.vault_name;
        this.data.vault_description = currentVault.vault_description;
      }
    }
  }
</script>


<style scoped>

</style>