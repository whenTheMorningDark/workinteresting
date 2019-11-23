<template>
  <div class="mxHome">
    <mxGraph :graphData="graphData"
             @initCell="initCell"
             @connect="connect"></mxGraph>
  </div>
</template>
<script>
export default {
  name: "mxHome",
  components: {},
  data () {
    return {
      isLoading: false,
      graphData: [
        { type: "start", to: [], value: "hello", options: { x: 50, y: 120, width: 120, height: 60, style: "" } },
        { type: "end", to: [], value: "world", options: { x: 350, y: 120, width: 120, height: 60, style: "" } }
      ]
    };
  },
  methods: {
    initCell (cell) {
      console.log(cell); // 监听图形的生成
      console.log(this.graphData) // 这是提交到后台的json数据
    },
    connect (options) {
      console.log(options);
      const { source, target } = options;
      // 在业务组件中做连线的关系的映射
      let sData = this.graphData.find((v) => v.id === source.id);
      let tData = this.graphData.find((v) => v.id === target.id);
      sData.to.push(tData.id); // 用to来作为连线关系的标识
      console.log(this.graphData);
    }
  }
};
</script>
<style lang="scss" scoped>
.mxHome {
  width: 500px;
  height: 500px;
  overflow: hidden;
  // height: 500px;
  border: 1px solid #ddd;
  // padding: 20px;
  margin: 0 auto;
}
</style>
