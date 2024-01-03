<template>
  <div @click.self="cancel" class="my-modal">
    <div class="my-modal-body">
      <slot></slot>
    </div>
  </div>
</template>


<script>
  export default {
    name: 'modal',
    computed: {},
    methods: {
      cancel() {
        this.$store.dispatch("closeModal");
      }
    }
  }

</script>


<style scoped>
  .my-modal {
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: 0px;
    top: 0px;
    background-color: rgba(0, 0, 0, 0.356);
  }

  .my-modal-body {
    z-index: 100;
    padding: 23px;
    border-radius: 15px;
    background-color: rgb(230, 230, 230);
    box-shadow: 4px 4px 23px rgb(51, 51, 51);
  }
</style>