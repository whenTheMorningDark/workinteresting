<template>
  <i :class="classes" :style="styles" @click="handClick"></i>
</template>

<script>
const preFixCls = "iconfont ka-icon";
// class="iconfont icon-jiantouxia"
export default {
  name: "Icon",
  props: {
    type: {
      type: String,
      default: ""
    },
    size: [Number, String],
    color: String
  },
  computed: {
    classes() {
      return [
        `${preFixCls}`,
        {
          [`${this.type}`]: this.type !== ""
        }
      ];
    },
    styles() {
      let style = {};
      if (this.size) {
        style["font-size"] = `${this.size}px`;
      }
      if (this.color) {
        style.color = this.color;
      }
      return style;
    }
  },
  methods: {
    handClick(e) {
      this.$emit("click", e);
    }
  }
};
</script>

<style>
</style>