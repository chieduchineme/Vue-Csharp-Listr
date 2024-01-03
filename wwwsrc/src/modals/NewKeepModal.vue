<template>
  <form class="user-form">
    <div class="form-group">
      <label for="user-name">Title</label>
      <input v-model="data.keep_name" type="text" class="form-control" id="user-name" placeholder="Title..." />
    </div>

    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text">Description</span>
      </div>
      <input v-model="data.keep_description" type="text" placeholder="Description..." />
    </div>

    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text">Picture Url</span>
      </div>
      <input v-model="data.keep_img_url" type="text" placeholder="Url..." />
    </div>

    <div class="button-container">
      <button @click.prevent="save" class="btn btn-primary">Ok</button>
      <button @click.prevent="cancel" class="btn btn-primary">Cancel</button>
    </div>
  </form>
</template>


<script>
  export default {
    name: 'new-keep-modal',
    props: [],
    components: {},
    data() {
      return {
        data: {
          vault_id: null,
          keep_name: "Grumpy",
          keep_description: "Cat",
          keep_img_url: "https://pbs.twimg.com/profile_images/1080545769034108928/CEzHCTpI_400x400.jpg",
          keep_is_public: true
        }
      }
    },
    methods: {
      save() {
        // this.data.user_id = this.userId();
        if (this.$store.state.Modal.addNewKeepToVault) {
          this.data.vault_id = this.$store.state.Vaults.currentVault.vault_id;
          this.$store.dispatch("createKeepInCurrentVault", this.data);
          this.cancel();
          return;
        }

        this.$store.dispatch("createKeep", this.data);
        this.cancel();
      },
      cancel() {
        // this.user = null;
        this.$store.dispatch("closeModal");
      }
    },
  }
</script>


<style scoped>

</style>