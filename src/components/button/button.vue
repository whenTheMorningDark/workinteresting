<template>
  <button :class="classes"
          :disabled="cIsDisable"
          @click="handleClick">
    <Icon type="iconloading"
          class="ka-loading"
          v-if="cIsDisable"></Icon>
    <span>
      <slot></slot>
    </span>
  </button>
</template>

<script>
const prefixCls = "ka-btn";
export default {
  name: "kaBtn",
  props: {
    type: {
      type: String,
      default: "default"
    },
    isDisable: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes () {
      return [`${prefixCls}`, `${prefixCls}-${this.type}`, { [`${prefixCls}-disabled`]: this.cIsDisable }];
    },
    // 是否按钮可以点击
    cIsDisable () {
      return this.isDisable || this.loading;
    }
  },
  methods: {
    handleClick (ev) {
      console.log("dianji");
      this.$emit("click", ev)
    }
  }
};
</script>
