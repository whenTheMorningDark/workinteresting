<template>
  <div :class="classes">
    <!-- $slots.header判断是否含有header的插槽 -->
    <div class="ka-list-header" v-if="header || $slots.header">
      <slot name="header">{{header}}--{{ $slots.header}}</slot>
    </div>
    <div class="ka-list-container">
      <ul class="ka-list-items">
        <slot></slot>
      </ul>
    </div>
    <div class="ka-list-footer" v-if="footer || $slots.footer">
      <slot name="footer">{{footer}}</slot>
    </div>
  </div>
</template>

<script>
const prefixCls = "ka-list";
export default {
  name: "list",
  provide() {
    return {
      listInsatnce: this
    };
  },
  props: {
    header: {
      type: String,
      default: ""
    },
    footer: {
      type: String,
      default: ""
    },
    size: {
      type: String,
      default: "default"
    },
    itemLayout: {
      type: String,
      default: "horizontal"
    },
    border: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    classes() {
      return [
        `${prefixCls}`,
        `${prefixCls}-${this.size}`,
        `${prefixCls}-${this.itemLayout}`,
        { [`${prefixCls}-bordered`]: this.border }
      ];
    }
  }
};
</script>

<style lang="scss" scoped>
.ka-list {
  position: relative;
  &.ka-list-bordered {
    border: 1px solid #dcdee2;
    border-radius: 6px;
    .ka-list-item {
      padding-right: 24px;
      padding-left: 24px;
    }
    .ka-list-footer {
      padding-right: 24px;
      padding-left: 24px;
      padding-top: 12px;
      padding-bottom: 12px;
      border-top: 1px solid #e8eaec;
    }
    &.ka-list-small {
      .ka-list-header {
        padding: 8px 16px;
      }
      .ka-list-item {
        padding-right: 16px;
        padding-left: 16px;
        padding-top: 8px;
        padding-bottom: 8px;
      }
      .ka-list-footer {
        padding: 8px 16px;
      }
    }
    &.ka-list-large {
      .ka-list-header {
        padding: 16px 24px;
      }
      .ka-list-item {
        padding-right: 24px;
        padding-left: 24px;
        padding-top: 16px;
        padding-bottom: 16px;
      }
      .ka-list-footer {
        padding: 16px 24px;
      }
    }
  }
  .ka-list-header {
    padding-right: 24px;
    padding-left: 24px;
    padding-top: 12px;
    padding-bottom: 12px;
    border-bottom: 1px solid #e8eaec;
  }
  .ka-list-item {
    display: flex;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid #e8eaec;
    word-break: break-word;
    &:last-child {
      border: none;
    }
  }
}
</style>>
