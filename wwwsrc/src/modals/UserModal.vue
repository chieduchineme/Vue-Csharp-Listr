<template>
  <form class="user-form">
    <div class="form-group">
      <label for="user-name">Name</label>
      <input
        v-model="data.user_username"
        type="text"
        class="form-control"
        id="user-name"
        placeholder="Enter Your Name"
      />
    </div>

    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text">Picture Url</span>
      </div>
      <input v-model="data.user_img_url" type="text" placeholder="Url..." />
    </div>

    <div class="form-group">
      <label for="color-picker">Color</label>
      <input v-model="data.user_color" type="color" id="color-picker" style="width:85%;" />
    </div>

    <div class="button-container">
      <button @click="save" class="btn btn-primary">Ok</button>
      <button @click="cancel" class="btn btn-primary">Cancel</button>
    </div>
  </form>
</template>


<script>
export default {
  name: "user-modal",
  data() {
    return {
      data: {
        user_id: "",
        user_username: "",
        user_color: "",
        user_img_url: "",
      }
    };
  },
  methods: {
    save() {
      this.$store.dispatch("editUser", this.data);
      this.cancel();
    },
    cancel() {
      this.data = null;
      this.$store.dispatch("closeModal");
    }
  },
  mounted() {
    this.data = this.$store.state.Auth.user;
  }
};
</script>

<style scoped>
.btn {
  margin-left: 10px;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  align-content: center;
}
</style>