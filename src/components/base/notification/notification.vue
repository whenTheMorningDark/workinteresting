<template>
  <!-- 通知组件的外层组件 -->
  <div :class="classes"
       :style="wrapStyles">
    <Notice></Notice>
  </div>
</template>

<script>
import Notice from "./notice";
const pre = "ivu"
const preFixCls = pre + "-notification";
import {transferIndex,transferIncrease} from "./transfer-queue";
export default {
  name: '',
  data () {
    return {
      notices: [], // 存放notice数据
      tIndex: this.handleGetIndex() // 层级index
    }
  },
  props: {
    preFixCls: {
      type: String,
      default: preFixCls
    },
    content: {
      type: String
    },
    className: {
      type: String
    },
    styles: {
      type: Object,
      default: () => {
        return {
          top: "65px",
          left: "50%"
        }
      }
    }
  },
  computed: {
    classes () {
      return [
        `${this.preFixCls}`,
        {
          [`${this.className}`]: !!this.className
        }
      ]
    },
    wrapStyles () {
      let styles = Object.assign({}, this.styles);
      styles["z-index"] = 1010 + this.tIndex;
      return styles;
    }
  },
  components: {
    Notice
  },
  methods:{
    handleGetIndex() {
      transferIncrease();
      return transferIndex;
    }
  }
}
</script>

<style lang="scss" scoped>
</style>