<template>
  <div class="user-icon" :style="style">
    <svg v-if="!hasImage" class="user-svg" viewBox="0 0 10 10">
      <circle cx="50%" cy="50%" r="5" :fill="user.color" />
      <text class="heavy" x="0" y="6" dx="10%" dy="18%" textLength="8"
        lengthAdjust="spacingAndGlyphs">{{ authorInitial }}</text>
    </svg>
  </div>
</template>

<script>
  export default {
    name: 'user-icon',
    props: {
      user: { type: Object }
    },
    computed: {
      hasImage() {
        let imgUrl = this.user.user_img_url
        let result = imgUrl && imgUrl !== ''
        return result
        // return this.user.imgUrl !== ''
      },
      style() {
        let data = ''

        if (this.hasImage) {
          data = `url('${this.user.user_img_url}')`
        } else {
          data = `'transparent'`
        }

        let result = {
          backgroundImage: data
        }
        return result
      },
      authorInitial() {
        let result = this.$store.state.Auth.user.user_username.charAt(0).toUpperCase();
        return result;
      },
    }
  }
</script>


<style scoped>
  .heavy {
    font: bold .55em monospace;
    fill: white;
  }

  .user-svg {
    height: 100%;
    width: 100%;
  }

  .user-icon {
    height: 100%;
    width: 100%;
    border-radius: 50%;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.534);

    /* font-size: 0.95em;
    font-weight: bold; */

    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;

    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>