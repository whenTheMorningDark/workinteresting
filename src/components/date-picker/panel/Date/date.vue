<template>
  <div :class="classes"
       @mousedown.prevent>

    <div :class="[prefixCls+'body']">
      <div :class="[datePrefixCls+'-header']">
        <span :class="iconBtnCls('prev','-double')">
          <Icon type="icondoubleLeft"></Icon>
        </span>

        <span :class="iconBtnCls('prev')">
          <Icon type="iconleftArrow"></Icon>
        </span>
        <date-panel-label :date-panel-label="datePanelLabel"
                          :current-view="pickerTable.split('-').shift()"
                          :date-prefix-cls="datePrefixCls"></date-panel-label>

      </div>
    </div>

  </div>
</template>
<script>
const prefixCls = "ivu-picker-panel";
const datePrefixCls = "ivu-date-picker";
import Mixin from "../panel-mixin";
import datePanelLabel from "./date-panel-label"
export default {
  name: "DatePickerPanel",
  mixins: [Mixin],
  components: {
    datePanelLabel
  },
  props: {
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data () {
    const { selectionMode } = this;
    return {
      prefixCls,
      datePrefixCls,
      currentView: selectionMode || 'date',
    }
  },
  computed: {
    classes () {
      return [
        `${prefixCls}-body-wrapper`
      ]
    }
  }
}
</script>
<style lang="scss" scope>
// .ivu-picker-panel-body {
//   float: left;
//   .ivu-date-picker-header {
//     height: 32px;
//     line-height: 32px;
//     text-align: center;
//     border-bottom: 1px solid #e8eaec;
//   }
// }
</style>