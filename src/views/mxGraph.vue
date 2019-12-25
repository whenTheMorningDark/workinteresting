<template>
  <div class="mxHome">
    <Button type="primary"
            @click="addImg">加图片</Button>
    <Button type="primary"
            @click="changColor">变黄色</Button>
    <mxGraph :graphData="graphData"
             @initCell="initCell"
             @connect="connect"
             :connectRules="rules"
             ref="mxGraph"></mxGraph>
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
        { type: "start", to: [], value: "hello", options: { x: 50, y: 120, width: 120, height: 60, style: { fillColor: "red", fontColor: "#333", rounded: 1 } } },
        { type: "end", to: [], value: "world", options: { x: 350, y: 120, width: 120, height: 60, style: { fillColor: "green" } } },
        { type: "action", to: [], value: "world", options: { x: 350, y: 320, width: 120, height: 60, style: {} } },
        { type: "desicion", to: [], value: "world", options: { x: 350, y: 220, width: 120, height: 60, style: {} } },
        { type: "desicion", to: [], value: "123", options: { x: 150, y: 320, width: 120, height: 60, style: {} } }
      ],
      img: require("./images/logo.png")
    };
  },
  methods: {
    initCell (cell) {
      console.log(cell); // 监听图形的生成
      console.log(this.graphData) // 这是提交到后台的json数据
    },
    connect (options) {
      console.log(options);
      console.log(this.graphData);
    },
    addImg () {
      console.log("click")
      let cell = this.$refs.mxGraph.getSelectionCells();
      let style = {
        fillColor: "transparent",
        fontColor: "transparent",
        shape: "label",
        imageWidth: 48,
        imageHeight: 48,
        image: this.img
      }
      this.$refs.mxGraph.setVeterStyle(cell, style);
      console.log(this.graphData)
    },
    changColor () {
      let edge = this.$refs.mxGraph.getSelectionCells()
      let style = {
        strokeColor: "yellow"
      }
      this.$refs.mxGraph.setEdgeStyleFun(edge, style);
    },
    rules (source, target) {
      console.log(source);
      console.log(target);
      if (target.type === "end") {
        return false;
      }
      return true;
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
