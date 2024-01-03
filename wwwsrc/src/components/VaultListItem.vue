<template>
  <div class="vault-list-item" @click="vaultClick">
    <div class="vault-text">
      <div class="vault-name">{{ vault.vault_name }}</div>
      <div class="vault-description">{{ vault.vault_description }}</div>
    </div>
    <div class="vault-keep-count">
      {{ vault.vault_keep_count }} Keeps
    </div>
  </div>
</template>

<script>
  export default {
    name: 'vault-list-item',
    props: {
      vault: { type: Object, required: true }
    },
    methods: {
      vaultClick() {
        this.$store.dispatch("setActiveVault", this.vault);
        this.$parent.$parent.$refs.VaultsSlider.closeSlider();
      }
    }
  }
</script>


<style scoped>
  .vault-list-item {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;

    margin: 15px;
    margin-top: 10px;
    margin-bottom: 0;
    padding: 5px;
    border-radius: 5px;
    border: solid rgba(77, 35, 35, 0.644) 1px;
    box-shadow: 1px 1px 2px rgba(7, 0, 0, 0.664);
    cursor: pointer;
  }

  .vault-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: flex-start;
    align-items: flex-start;
  }

  .vault-keep-count {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;

    background-color: rgba(255, 175, 2, 0.671);
    color: white;

    border-radius: 5px;

    padding: 10px;
  }

  .vault-name {
    color: rgba(204, 204, 204, 0.911);
    font-size: 1.5em;
  }

  .vault-description {
    color: rgba(165, 165, 165, 0.918);
    font-size: 1.2em;
  }

  .vault-list-item:hover {
    box-shadow: 2px 2px 4px rgba(255, 0, 0, 0.726);
  }
</style>