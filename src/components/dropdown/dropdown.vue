<template>
  <div :class="[prefixCls]">
    <div :class="relClasses"
         ref="reference"
         @click="handleClick">
      <slot></slot>
    </div>
    <Drop v-show="currentVisible"
          ref="drop">
      <slot name="list"></slot>
    </Drop>
  </div>
</template>

<script>
// https://github.com/view-design/ViewUI/blob/master/src/components/dropdown/dropdown.vue // 101 - 108 可触发更新drop的update
const prefixCls = "ka-dropdown";
import Drop from "./drop";
export default {
  name: "dropdown",
  props: {
    visible: { // 传入是否显示
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      prefixCls: prefixCls,
      currentVisible: this.visible
    }
  },
  components: {
    Drop
  },
  computed: {
    relClasses () {
      return [
        `${prefixCls}-rel`,
        {
          [`${prefixCls}-rel-user-select-none`]: this.trigger === 'contextMenu' // 如果是右键则屏蔽它的默认事件
        }
      ]
    }
  },
  methods: {
    handleClick () {
      this.currentVisible = !this.currentVisible;
    }
  },
  watch: {
    visible (val) {
      this.currentVisible = val
    },
    currentVisible (val) {
      if (val) {
        this.$refs.drop.update()
      } else {
        this.$refs.drop.destroy();
      }
      this.$emit('on-visible-change', val);
    }
  }
}
</script>

<style>
</style>