<template>
  <div class="mxGraph">
    <ToolBar :icons="icons"
             @handClick="handClick"></ToolBar>
    <Graph :graphData="graphData"
           @initCell="initCell"
           @connect="connect"
           @delEvent="delEvent"
           ref="graph"></Graph>
  </div>
</template>

<script>
import ToolBar from "./toobar";
import Graph from "./Graph";
export default {
  name: "mxgrapph",
  props: {
    icons: {
      type: Array,
      default: () => {
        return []
      }
    },
    graphData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  // computed: {
  //   cGraphData () {
  //     return this.graphData;
  //   }
  // },
  methods: {
    initCell (cell) {
      this.$emit("initCell", cell);
    },
    connect (options) {
      const { edge, source, target } = options;
      // 在业务组件中做连线的关系的映射
      let sData = this.graphData.find((v) => v.id === source.id);
      let tData = this.graphData.find((v) => v.id === target.id);
      let SoureisHave = sData.to.some((v) => v === tData.id);
      let TargetisHave = tData.to.includes(sData.id);
      console.log(TargetisHave);
      if (SoureisHave || TargetisHave) {
        console.log("不能重复链接");
        // console.log("不能重复链接"); 此时edges还是已经相连必须把这个连线删除掉
        this.$refs.graph.removeFun(edge);
      } else {
        sData.to.push(tData.id);
      }
      // sData.to.push(tData.id); // 用to来作为连线关系的标识
      // if(sData)
      this.$emit("connect", options);
    },
    // 监听删除事件
    delEvent (cell) {
      // console.log(cell);
      // let filterCell = cell.filter((v)=>v.verter); // 找出cell
      // let filterEdge = cell.filter((v)=>v.edge); // 找出edge11
      console.log(cell);
      cell.forEach((v) => {
        if (v.vertex) {
          let vIndex = this.graphData.findIndex((q) => q.id === v.id);
          console.log(vIndex);
          this.graphData.splice(vIndex, 1);
          this.graphData.forEach((v) => {
            let to = v.to;
            let index = to.findIndex((s) => s === v.id);
            console.log(index);
            v.to.splice(index, 1);
          })
        } else if (v.edge) {
          // let eSource = v.source;
          // let eTarget = v.target;
          // let sData = this.graphData.find((v) => v.id === eSource.id);
          // let tData = this.graphData.find((v) => v.id === eTarget.id);
          // console.log(sData);
          // if (!sData) {
          //   console.log("来源节点已经删除了");
          //   return;
          // }
          // let sIndex = sData.to.findIndex((v) => v === tData.id);
          // sData.to.splice(sIndex, 1);
        }
      })
      console.log(this.graphData);
    },
    // 点击tool
    handClick (item) {
      let events = {
        delete: () => {
          this.$refs.graph.deleteSelect()
        },
        big: () => {
          this.$refs.graph.big()
        },
        small: () => {
          this.$refs.graph.small()
        }
      }
      if (events[item.type]) { // 内置默认的方法执行 不属于组件业务逻辑
        events[item.type]()
      } else {
        this.$emit("handClick", item);
      }

    }
  },
  components: {
    ToolBar,
    Graph
  }
}
</script>

<style>
</style>