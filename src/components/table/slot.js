export default {
  functional: true, // 无状态组件
  props: {
    row: Object,
    column: Object,
    index: Number
  },
  render: (h, ctx) => {
    console.log(ctx);
    // console.log(ctx.injections.tableRoot.$scopedSlots[ctx.props.column.slot]({
    //   row: ctx.props.row,
    //   column: ctx.props.column,
    //   index: ctx.props.index
    // }))
    return h(
      "div", {
        style: {
          color: "red"
        }
      }, "asddsa");
  }
};
