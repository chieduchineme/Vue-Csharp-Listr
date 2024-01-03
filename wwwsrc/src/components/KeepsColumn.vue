<template>
  <div class="keeps-column">
    <keep v-for="keep in keeps" :key="keep.keep_id" :keep="keep" />
  </div>
</template>

<script>
  export default {
    name: 'keeps-column',
    props: {
      columnKey: { type: Number }
    },
    computed: {
      keeps() {
        return this.$store.state.Keeps.keepsColumns[this.columnKey];
      }
    }
  }
</script>


<style scoped>
  .keeps-column {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;
  }
</style>