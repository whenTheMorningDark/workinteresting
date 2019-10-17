<template>
  <button :class="classes">按钮</button>
</template>

<script>
const prefixCls = "ka-btn";
export default {
  name: "kaBtn",
  props: {
    type: {
      type: String,
      default: "default"
    }
  },
  computed: {
    classes() {
      return [`${prefixCls}`, `${prefixCls}-${this.type}`];
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>