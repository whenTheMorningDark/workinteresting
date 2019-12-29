<template>
  <button :class="classes"
          :disabled="isDisable"
          @click="handleClick">
    <Icon type="iconloading"
          class="ka-loading"
          v-if="loading"></Icon>
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
      return [`${prefixCls}`, `${prefixCls}-${this.type}`, { [`${prefixCls}-loading`]: this.loading }];
    }
  },
  methods: {
    handleClick (ev) {
      this.$emit("click", ev)
    }
  }
};
</script>
