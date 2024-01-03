<template>
  <div class="keep-view-count">
    {{ keep.keep_view_count }}
  </div>
</template>


<script>
  export default {
    name: 'keep-view-count',
    props: {
      keep: { type: Object, required: true }
    }
  }
</script>


<style scoped>
  .keep-view-count {
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    top: 6px;
    left: calc(2 * (var(--info-height) - 12px + 10px));
    position: absolute;
    margin-left: 5px;
    height: calc(var(--info-height) - 12px);
    width: calc(var(--info-height) - 12px);
    background-color: var(--keep-view-count-color);
    color: rgba(255, 255, 255, 0.800);
    font-size: 0.9em;
    border-radius: 50%;
    box-shadow: 1px 1px 2px black;
    vertical-align: middle;
    z-index: 10;
  }
</style>