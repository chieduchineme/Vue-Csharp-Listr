<template>
  <div id="user-view" class="user-view">
    <keeps-container :keeps="keeps" :parentId="'user-view'" />
    <!-- <slide-out ref="Vaults" :myRef="'Vaults'" />
    <button @click="slideOut"></button>
    <div class="flex-row">
      <div class="flex-col size-1">
        <h1>Your Vaults</h1>
        <vaults />
      </div>
      <div id="user-keeps" class="flex-col size-2">
        <h1>Your Keeps</h1>
        <keeps-container :keeps="keeps" :parentId="'user-keeps'" />
      </div>
    </div> -->
  </div>
</template>


<script>
  export default {
    name: 'user-view',
    computed: {
      keeps() {
        return this.$store.state.UserKeeps.userKeeps;
      }
    }
  }
</script>


<style scoped>
  /* .flex-row {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }

  .flex-col {
    display: flex;
    flex-direction: column;
    min-width: 300px !important;
    height: 72vh !important;
    overflow-y: scroll;
  }

  .size-1 {
    width: 33vw;
  }

  .size-2 {
    width: 66vw;
  } */
</style>