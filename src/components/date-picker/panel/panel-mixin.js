const prefixCls = 'ivu-picker-panel';
const datePrefixCls = 'ivu-date-picker';

export default {
  props: {
    confim: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    iconBtnCls(direction, type = '') {
      return [
        `${prefixCls}-icon-btn`,
        `${datePrefixCls}-${direction}-btn`,
        `${datePrefixCls}-${direction}-btn-arrow${type}`,
      ];
    }
  }
}
