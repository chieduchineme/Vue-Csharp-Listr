<template>
  <div class="keeps">
    <!-- <stack :column-min-width="200" :gutter-width="8" :gutter-height="8" monitor-images-loaded="true">
      <stack-item v-for="keep in keeps" :key="keep.keep_id">
        <keep :keep="keep" />
      </stack-item>
    </stack> -->
    <keeps-column v-for="key in columnCount" :key="'keeps-column-' + key" :columnKey="key - 1" />
  </div>
</template>

<script>
  import { Stack, StackItem } from 'vue-stack-grid';
  export default {
    name: 'keeps',
    components: { Stack, StackItem },
    computed: {
      keeps() {
        return this.$store.state.Keeps.keeps;
      },
      columnCount() {
        let result = this.$store.state.Settings.display.columnCount;
        return result;
      }

    }
  }
</script>

<style scoped>
  .keeps {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: flex-start;
    align-content: flex-start;
  }
</style>