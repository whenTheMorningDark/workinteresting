<template>
  <div class="ka-select-dropdown"
       :class="className">
    <slot></slot>
  </div>
</template>

<script>
import Vue from 'vue';
const isServer = Vue.prototype.$isServer;
const Popper = isServer ? function () { } : require('popper.js/dist/umd/popper.js');  // eslint-disable-line
export default {
  name: "Drop",
  props: {
    className: {
      type: String
    },
    placement: {
      type: String,
      default: 'bottom-start'
    }
  },
  data () {
    return {
      popper: null,
      popperStatus: false
    }
  },
  methods: {
    update () {
      // console.log(isServer);
      // console.log(Popper);
      if (isServer) {
        return
      }
      if (this.popper) {
        this.$nextTick(() => {
          this.popper.update();
          this.popperStatus = true;
        })
      } else {
        this.$nextTick(() => {
          this.popper = new Popper(this.$parent.$refs.reference, this.$el, {
            placement: this.placement,
            modifiers: {
              computeStyle: {
                gpuAcceleration: false
              },
              preventOverflow: {
                boundariesElement: 'window'
              }
            },
            onCreate: () => {
              // this.resetTransformOrigin();
              this.$nextTick(this.popper.update());
            },
            onUpdate: () => {
              console.log("update");
              // this.resetTransformOrigin();
            }
          })
        })
      }
    },
    destroy () {
      if (this.popper) {
        setTimeout(() => {
          if (this.popper && !this.popperStatus) {
            this.popper.destroy();
            this.popper = null;
          }
          this.popperStatus = false;
        }, 300)
      }
    }
  },
  created () {
    this.$on('on-update-popper', this.update);
    this.$on('on-destroy-popper', this.destroy);
  },
}
</script>

<style>
</style>