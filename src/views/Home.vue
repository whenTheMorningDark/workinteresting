<template>
  <div class="home">
    <mxGraph :graphData="graphData"
             @initCell="initCell"
             @connect="connect"></mxGraph>
  </div>
</template>
<script>
export default {
  name: "home",
  components: {},
  data () {
    return {
      value1: "1",
      list: [
        { name: "1", title: "标题1", content: "标题112312321的内容" },
        { name: "2", title: "标题2", content: "标题2的内容" },
        { name: "3", title: "标题3", content: "标题3的内容" },
        { name: "4", title: "标题4", content: "标题4的内容" }
      ],
      isLoading: false,
      graphData: [
        { type: "start", to: [], options: { x: 50, y: 120, width: 120, height: 60, value: "hello", style: "" } },
        { type: "end", to: [], options: { x: 350, y: 120, width: 120, height: 60, value: "world", style: "" } }
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
.home {
  width: 500px;
  height: 500px;
  overflow: hidden;
  // height: 500px;
  border: 1px solid #ddd;
  // padding: 20px;
  margin: 0 auto;
}
</style>
