<template>
  <div class="keep" :style="keepAuxStyle" v-if="showKeep">
    <img class="keep-img" :src="keep.keep_img_url" @click.self="keepClick" />
    <save-keep :keep="keep" />
    <keep-options :keep="keep" />
    <keep-info :keep="keep" />
  </div>
</template>


<script>
  export default {
    name: 'keep',
    props: {
      keep: {
        keep_name: "",
        keep_description: "",
        keep_img_url: ""
      }
    },
    data() {
      return {
        keepAuxStyle: ""
      }
    },
    computed: {
      showKeep() {
        if (this.$route.name == 'Home') {
          this.keepAuxStyle = "";
          return this.keep.keep_is_public;
        } else if (this.keep.keep_is_public) {
          this.keepAuxStyle = "";
          return true;
        } else {
          this.keepAuxStyle = {
            border: 'solid rgba(255, 0, 98, 0.774) 3px',
            boxShadow: '2px 2px 6px rgba(128, 128, 128, 0.568)'
          }
          return this.userId() == this.keep.user_id;
        }
      }
    },
    methods: {
      keepClick() {
        this.$router.push({ name: "Keep", params: { keepId: this.keep.keep_id } });
      }
    }
  }
</script>


<style scoped>
  .keep {
    width: 200px;
    height: 100%;
    margin: 5px;
    border-radius: 17px;
    box-shadow: 1px 1px 4px rgba(128, 128, 128, 0.568);
    border: solid rgba(128, 128, 128, 0.753) 1px;
    position: relative;
  }

  .hide {
    visibility: hidden;
  }

  .keep:hover {
    box-shadow: 2px 2px 6px rgba(128, 128, 128, 0.568);
  }

  .keep:hover .hide {
    visibility: visible;
  }

  .keep-img {
    height: 100%;
    width: 100%;
    border-radius: 15px;
    cursor: pointer;
    z-index: -1;
  }
</style>