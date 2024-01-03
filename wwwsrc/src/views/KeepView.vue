<template>
  <div class="container keep-view" v-if="keep">
    <div class="row">
      <div class="col-6">
        <h2>{{ keep.keep_name }}</h2>
        <img :src="keep.keep_img_url">
        <p>{{ keep.keep_description }}</p>
        <!-- Keep Tags -->
        <!-- Keep Author -->
        <!-- Keep View Count -->
        <p>View Count: {{ keep.keep_view_count }}</p>
        <!-- Keep Keep Count -->
        <p>Keep Count: {{ keep.keep_keep_count }}</p>
      </div>
      <div class="col-6">
        <h1>COMMENTS</h1>
        <!-- Keep Comments -->
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'keep-view',
    computed: {
      keep() {
        return this.$store.state.Keeps.activeKeep;
      }
    }
  }
</script>

<style scoped>
  img {
    width: 90%;
    height: auto;
    margin: auto;
  }
</style>