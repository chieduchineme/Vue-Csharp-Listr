<template>
  <textarea rows="1" type="text" class="click-edit"
    v-bind:class="[editing ? 'editing' : 'dormant', 'input-group-prepend', 'form-control', 'my-class']"
    v-model="editValue" v-bind:placeholder="placeHolder" @change.prevent="resize" @cut="delayedResize"
    @paste="delayedResize" @click.prevent="click($event)" @keydown="keyDown($event)" @focusout="focusOut($event)"
    @resize="resize" v-bind:readonly="!editing" />
  </template>

<script>
  export default {
    name: "click-edit",
    props: {
      initialValue: { type: String },
      placeHolder: { type: String },
      enterKeyPress: { type: Function, required: true }
    },
    components: {},
    data() {
      return {
        initialValueToUse: "",
        editValue: "",
        editing: false
      };
    },
    computed: {

    },
    mounted() {
      this.editValue = ''
      this.initialValueToUse = this.initialValue;

      setTimeout(() => {
        this.$el.onresize = this.resize()
        this.editValue = this.initialValue
        this.resize()
      }, 100)

    },
    methods: {
      delayedResize() {
        window.setTimeout(this.resize(), 0);
      },
      resize(event) {
        window.setTimeout(() => {
          let textarea = this.$el

          this.$el.onresize = undefined

          textarea.style.height = 'auto';
          textarea.style.height = textarea.scrollHeight + 'px';

          this.$el.onresize = this.resize()
        }, 1);

      },
      cancel(event) {
        window.getSelection().removeAllRanges();
        this.editing = false;
        this.editValue = this.initialValue;

        event.target.blur();
      },
      click(event) {
        event.preventDefault();

        if (this.editing) {
          return
        }

        this.editing = true;
        let pos = event.target.value.length;

        let element = event.target;
        // Modern browsers
        if (element.setSelectionRange) {
          element.focus();
          element.setSelectionRange(0, pos);

          // IE8 and below
        } else if (element.createTextRange) {
          var range = element.createTextRange();
          range.collapse(true);
          range.moveEnd("character", pos);
          range.moveStart("character", 0);
          range.select();
        }
      },
      keyDown(event) {
        switch (event.key) {
          case "Enter":
            let newValue = this.editValue
            this.enterKeyPress(this.editValue);
            this.editing = false;
            event.target.blur();

            this.initialValueToUse = newValue;
            this.editValue = newValue;
            break;
          case "Escape":
            this.cancel(event);
            break;
          default:
          // this.delayedResize(event)
        }
      },
      focusOut(event) {
        this.cancel(event);
      }
    }
  };
</script>

<style scoped>
  .click-edit {
    /* width: 100%;
    height: 100%; */
  }

  input {
    font-size: 1.618em;
    /* width: 100%;
    height: 100%; */
  }

  .editing {
    /* border-radius: 2px; */
    /* border: solid rgb(40, 148, 236) 2px; */
    cursor: text;
    /* background-color: rgb(209, 209, 209); */
  }

  .dormant {
    border: none;
    cursor: pointer;
    background-color: transparent;
  }

  textarea {
    resize: none;
    overflow-wrap: break-word;
    overflow: hidden;
  }
</style>