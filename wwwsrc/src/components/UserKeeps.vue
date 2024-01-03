<template>
  <div class="user-keeps">
    <div class="user-keeps-column" v-for="index in columnCount - 1" :key="'keeps-array-' + index">
      <keep v-for="keep in columns[index]" :key="keep.keep_id" :keep="keep" />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'user-keeps',
    computed: {
      columns() {
        return this.$store.state.UserKeeps.userKeepsColumns;
      },
      columnCount() {
        return this.$store.state.Settings.display.columnCount;
      }
    },
    watch: {

    },
    methods: {
      resizeWindow() {
        this.$store.dispatch("resizeUserView");
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.resizeWindow();
        window.addEventListener('resize', this.resizeWindow);
      });
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.resizeWindow);
    }
  }
</script>


<style scoped>
  .user-keeps {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: flex-start;
    align-content: flex-start;

    height: 72vh !important;
    overflow-y: scroll;
    width: 100%;
  }

  .user-keeps-column {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;
  }
</style>