<template>
  <li :class="classes">
    <slot></slot>
  </li>
</template>

<script>
const prefixCls = "ka-list-item";
export default {
  name: "ListItem",
  inject: ["listInsatnce"],
  computed: {
    classes() {
      return [`${prefixCls}`];
    }
  }
};
</script>

<style>
</style>