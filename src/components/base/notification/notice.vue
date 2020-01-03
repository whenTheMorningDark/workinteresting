<template>
  <div :class="classes"
       :style="styles">
    <div :class="contentClasses"
         ref="content"
         v-html="content"></div>
  </div>
</template>

<script>
export default {
  props: {
    prefixCls: {
      type: String,
      default: ""
    },
    className: {
      type: String
    },
    // 窗口关闭的回调
    onClose: {
      type: Function
    },
    // 窗口关闭的时间
    duration: {
      type: Number,
      default: 1.5
    }
  },
  data () {
    return {

    }
  },
  computed: {
    // 基础类名
    baseClass () {
      return `${this.prefixCls}-notice`;
    },
    // 弹出窗的类名
    classes () {
      return [
        this.baseClass,
        {
          [`${this.className}`]: !!this.className,
          [`${this.baseClass}-closable`]: this.closable,
          [`${this.baseClass}-with-desc`]: this.withDesc,
          [`${this.baseClass}-with-background`]: this.background
        }
      ]
    },
    contentClasses () {
      return [
        `${this.baseClass}-content`
      ]
    }
  },
  methods: {
    clearCloseTimer () {
      if (this.closeTimer) {
        clearTimeout(this.closeTimer);
        this.closeTimer = null;
      }
    },
    close () {
      this.clearCloseTimer();
      this.onClose() // 触发关闭的回调
    }
  },
  mounted () {
    this.clearCloseTimer();
    // 如果duration === 0 则不会关闭
    if (this.duration !== 0) {
      this.closeTimer = setTimeout(() => {
        this.close();
      }, this.duration * 1000)
    }
  }
}
</script>

<style lang='scss' scoped>
</style>