<template>
  <div :class="wrapperClasses"
       v-click-outside:[capture]="handleClose">
    <div ref="reference"
         :class="[prefixCls+'-rel']">
      <slot>
        <input @click="handleFocus"
               @blur="handleBlur"
               @focus="handleFocus" />
      </slot>
    </div>
    <Drop v-show="opened"
          :class="{[prefixCls+'-transfer']:transfer}"
          :placement="placement"
          ref="drop">
      <div ref="pickerPanel">
        123
      </div>
    </Drop>
  </div>
</template>
<script>
const prefixCls = 'ivu-date-picker';
import Drop from "../dropdown/drop";
import { directive as clickOutside } from "../../directive/v-click-outside-x"
// const pickerPrefixCls = 'ivu-picker';
export default {
  directives: {
    clickOutside
  },
  props: {
    open: { // 是否打开drop
      type: Boolean,
      default: null
    },
    placement: { // drop放置的位置

      default: 'bottom-start'
    },
    readonly: { // 只读
      type: Boolean,
      default: false
    },
    capture: {
      type: Boolean,
      default () {
        return !this.$IVIEW ? true : this.$IVIEW.capture;
      }
    }
  },
  data () {
    return {
      prefixCls: prefixCls,
      isFocused: false,
      transfer: false,
      visible: false,
      internalFocus: false,
      disableCloseUnderTransfer: false,  // transfer 模式下，点击Drop也会触发关闭,
    }
  },
  components: {
    Drop
  },
  computed: {
    wrapperClasses () {
      return [
        prefixCls, {
          [prefixCls + '-focused']: this.isFocused
        }
      ]
    },
    opened () {
      return this.open === null ? this.visible : this.open;
    }
  },
  methods: {
    handleFocus (e) {
      console.log(e)
      if (this.readonly) return;
      this.isFocused = true;
      if (e && e.type === 'focus') return; // just focus, don't open yet
      this.visible = true;
    },
    handleClose (e) {
      console.log("close");
      if (this.disableCloseUnderTransfer) {
        this.disableCloseUnderTransfer = false;
        return false;
      }
      if (e && e.type === 'mousedown' && this.visible) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      if (this.visible) {
        // const pickerPanel = this.$refs.pickerPanel && this.$refs.pickerPanel.$el;
        const pickerPanel = this.$refs.pickerPanel;
        if (e && pickerPanel && pickerPanel.contains(e.target)) return; // its a click inside own component, lets ignore it.
        this.visible = false;
        e && e.preventDefault();
        e && e.stopPropagation();
        this.$emit('on-clickoutside', e);
        return;
      }
      this.isFocused = false;
      this.disableClickOutSide = false;
    },
    handleBlur (e) {
      console.log("blur");
      if (this.internalFocus) {
        this.internalFocus = false;
        return;
      }
      if (this.visible) {
        e.preventDefault();
        return;
      }
      this.isFocused = false;
      // this.onSelectionModeChange(this.type);
      // this.internalValue = this.internalValue.slice(); // trigger panel watchers to reset views
      // this.reset();
      // this.$refs.pickerPanel.onToggleVisibility(false);
    },
  }
}
</script>
<style lang="scss">
.ivu-date-picker {
  display: inline-block;
  line-height: normal;
  width: 200px;
}
</style>