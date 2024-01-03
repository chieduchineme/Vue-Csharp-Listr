<template>
  <div class="vault">
    <div class="vault-text">
      <click-edit :initialValue="vault.vault_name" :placeHolder="'Vault Name'" :enterKeyPress="saveVaultName" />
      <click-edit :initialValue="vault.vault_description" :placeHolder="'Vault Description'"
        :enterKeyPress="saveVaultDescription" />
    </div>
    <div class="vault-options">
      <button class="btn btn-danger">Remove</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'vault',
    props: {
      vault: { type: Object, required: true }
    },
    methods: {
      saveVaultName(newVaultName) {

      },
      saveVaultDescription(newVaultDescription) {

      }
    }
  }
</script>

<style scoped>
  .vault {
    width: 90%;
    display: flex;
    flex-flow: row;
    justify-content: space-between;

    border: solid rgb(172, 172, 172) 1px;
    box-shadow: 1px 1px 2px black;
    margin: 5px;
    border-radius: 10px;
  }

  .vault-text {
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    align-content: flex-start;
    width: 100%;
  }

  .vault-options {
    padding: 10px;
    display: flex;
    flex-flow: row;
    justify-content: flex-end;
    align-content: center;
  }
</style>