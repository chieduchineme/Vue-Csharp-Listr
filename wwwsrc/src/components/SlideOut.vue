<template>
  <div id="mySidenav" :style="style" class="sidenav">
    <div class="btn-toolbar justify-content-between pl-3 mb-3" role="toolbar">
      <button type="button" class="close" aria-label="Close">
        <span aria-hidden="true" @click="closeSlider">&times;</span>
      </button>
    </div>
    <div class="slide-out-content" :style="slideOutContent">
      <slot></slot>
    </div>
    <!-- THIS IS A GOOD BUTTON TO USE FOR A SLIDE-OUT -->
    <!-- <span style="font-size:30px;cursor:pointer" @click="openSlider">&#9776; open</span> -->
  </div>
</template>


<script>
  export default {
    name: 'slide-out',
    data() {
      return {
        slideWidth: 0,
        style: {},
        slideOutContent: {}
      };
    },
    computed: {},
    watch: {
      slideWidth() { // This gets called when this.slideWidth changes
        this.style = {
          marginTop: `${this.$store.state.Settings.display.navBarHeight}px`,
          width: `${this.slideWidth}px`
        };

        let height = window.innerHeight - this.$store.state.Settings.display.navBarHeight - 75;
        this.slideOutContent = {
          width: `${this.slideWidth}px`,
          height: `${height}px`,
          overflowY: 'scroll'
        }
      }
    },
    methods: {
      openSlider() {
        this.slideWidth = 450;
      },
      closeSlider() {
        this.slideWidth = 0;
      }
    }
  }
</script>


<style scoped>
  .close {
    margin-right: 25px;
    color: white;
  }

  body {
    font-family: "Lato", sans-serif;
  }

  .sidenav {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 200;
    top: 0;
    left: 0;
    background-color: rgba(17, 17, 17, 0.781);
    overflow-x: hidden;
    transition: 0.5s;
    padding-top: 15px;
    color: #b8b8b8;
    /* overflow: hidden; */
  }

  .sidenav a {
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 25px;
    color: #b8b8b8;
    display: block;
    transition: 0.3s;
  }

  .sidenav a:hover {
    color: #4e4e4e;
  }

  @media screen and (max-height: 450px) {
    .sidenav {
      padding-top: 15px;
    }

    .sidenav a {
      font-size: 18px;
    }
  }
</style>