<template>
  <!-- <button class="btn keep-tags-button" data-toggle="dropdown">0</button> -->
  <div class="keep-tags-button">
    {{ keep.keep_id }}
    <!-- <button class="btn keep-tags" data-toggle="dropdown">Keep</button> -->
  </div>
</template>


<script>
  export default {
    name: 'keep-tags-button',
    props: {
      keep: { type: Object, required: true }
    },
    components: {},
    data() {
      return {}
    },
    computed: {},
    methods: {}
  }
</script>


<style scoped>
  .keep-tags-button {
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    top: 6px;
    float: left;
    position: absolute;
    margin-left: 8px;
    height: calc(var(--info-height) - 12px);
    width: calc(var(--info-height) - 12px);
    background-color: var(--keep-tag-color);
    color: rgba(104, 104, 104, 0.9);
    font-size: 0.9em;
    box-shadow: 1px 1px 2px black;
    vertical-align: middle;

    border-radius: 3px;
    border-bottom-left-radius: 6px;

    z-index: 10;

    cursor: pointer !important;
  }

  .keep-tags-button:hover:hover {
    box-shadow: 2px 2px 6px rgb(45, 46, 0);
  }
</style>