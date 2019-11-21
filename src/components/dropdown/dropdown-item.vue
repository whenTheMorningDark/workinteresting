<template>
  <li :class="classes"
      @click="handleClick">
    <slot>
    </slot>
  </li>
</template>

<script>
const prefixCls = "ka-dropdown-item";
export default {
  name: "DropdownItem",
  props: {
    name: {
      type: [String, Number]
    },
    disabled: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Boolean,
      default: false
    },
    divied: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes () {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-disabled`]: this.disabled,
          [`${prefixCls}-selected`]: this.selected,
          [`${prefixCls}-divied`]: this.divied
        }
      ]
    }
  },
  methods: {
    handleClick () {
      if (this.disabled) {
        return
      }
      const $parent = this.$utils.findComponentUpward(this, "dropdown");
      console.log($parent);
      $parent.$emit("on-click", this.name);
    }
  }
}
</script>

<style>
</style>