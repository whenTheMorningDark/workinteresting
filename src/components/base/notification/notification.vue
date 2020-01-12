<template>
  <!-- 通知组件的外层组件 -->
  <div :class="classes"
       :style="wrapStyles">
    <Notice v-for="notice in notices"
            :key="notice.name"
            :name="notice.name"></Notice>
  </div>
</template>

<script>
import Notice from "./notice";
const pre = "ivu"
const preFixCls = pre + "-notification";
import { transferIndex, transferIncrease } from "./transfer-queue";
let seed = 0;
const now = Date.now();
function getUuid () {
  return 'ivuNotification_' + now + '_' + (seed++);
}
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
  methods: {
    handleGetIndex () {
      transferIncrease();
      return transferIndex;
    },
    add (notice) {
      const name = notice.name || getUuid();
      let _notice = Object.assign({
        styles: {
          right: "50%",
        },
        content: "",
        duration: 1.5,
        closable: false,
        name: name
      }, notice)
      this.notices.push(_notice);
      this.tIndex = this.handleGetIndex();
    },
    close (name) {
      const notices = this.notices;
      for (let i = 0; i < notices.length; i++) {
        if (notices[i].name === name) {
          this.notices.splice(i, 1);
          break;
        }
      }
    },
    closeAll () {
      this.notices = []
    }
  }
}
</script>

<style lang="scss" scoped>
</style>