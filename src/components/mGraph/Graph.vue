<template>
  <div class="container"
       ref="container">
  </div>
</template>

<script>
import {
  mxGraph,
  mxEvent
} from 'mxgraph/javascript/mxClient'
export default {
  name: "mxContainer",
  props: {
    graphData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      graph: null, // 画布的整个对象
      cell: null // 当前选择到的cell对象
    }
  },
  methods: {
    // 初始化graph对象
    init () {
      this.graph = new mxGraph(this.$refs.container);
      this.$refs.container.style.background = "url(" + require("./images/grid.gif") + ")";
      this.graph.setConnectable(true); // 设置可以连线
      this.graph.setCellsCloneable(false);// 禁止ctrl生成元素
      this.graph.setAllowDanglingEdges(false);// 不可以随意移动edge
      this.createData()
    },
    // 初始化graphData数据
    /**
     * graphData:[
     *  {type:"start",to:[],options:{x,y,width,height,style}}
     * ]
     * 
     */
    createData () {
      this.parent = this.graph.getDefaultParent();
      this.graph.getModel().beginUpdate();
      console.log(this.graphData);
      try {
        for (let i = 0; i < this.graphData.length; i++) {
          let baseOptions = this.graphData[i].options;
          let type = this.graphData[i].type || "";
          let value = this.graphData[i].value || "";
          let id = this.graphData[i].id || null;
          let { x, y, width, height, style } = baseOptions;
          let verter = this.graph.insertVertex(this.parent, id, value, x, y, width, height, style || "");
          verter.type = type || "";
          this.graphData[i].id = this.graphData[i].id ? this.graphData[i].id : verter.id;
          this.graphData[i].to = this.graphData[i].to.length > 0 ? this.graphData[i].to : [];
        }
        let isHaveTo = this.graphData.some((v) => v.to.length > 0);
        const cells = this.graph.getChildVertices(this.graph.getDefaultParent()); // 所有的图形
        if (isHaveTo) {
          for (let i = 0; i < this.graphData.length; i++) {
            let arr = this.graphData[i].to;
            let source = this.findCell(this.graphData[i].id);
            if (arr instanceof Array && arr.length > 0) {
              for (let i = 0; i < arr.length; i++) {
                let target = this.findCell(arr[i]);
                if (!source || !target) {
                  return;
                }
                this.graph.insertEdge(this.parent, null, "", source, target);
              }
            }
          }
        }
        // console.log(cells);
        this.$emit("initCell", cells);
      } finally {
        this.graph.getModel().endUpdate();
      }
    },
    // graph的工具方法
    // 监听cell的连线事件 在这里可以利用target和source来判断连线的合法性
    connectFun () {
      this.graph.connectionHandler.addListener(mxEvent.CONNECT, (sender, evt) => {
        let edge = evt.getProperty("cell");
        let source = this.graph.getModel().getTerminal(edge, true);
        let target = this.graph.getModel().getTerminal(edge, false);
        this.$emit("connect", { edge, source, target });
      })
    },
    // 监听cell删除事件
    removeEvent () {
      this.graph.addListener(mxEvent.CELLS_REMOVED, (sender, evt) => {
        // console.log(sender);
        // console.log(evt);
        let cell = evt.properties.cells;
        // console.log(cell);
        this.$emit("delEvent", cell);
      });
    },
    // 工具方法
    findCell (id) {
      const cells = this.graph.getChildVertices(this.graph.getDefaultParent()); // 获取所有的图形
      let cell = cells.find((v) => v.id === id);
      return cell;
    },
    // 删除图形的方法,包括cell和edge
    removeFun (cell) {
      this.graph.removeCells([cell], true);
    },
    // 获取选中的元素
    getSelectionCells () {
      return this.graph.getSelectionCells();
    },
    // 删除选中的图形
    deleteSelect () {
      let select = this.getSelectionCells();
      console.log(select);
      this.graph.removeCells(select, true)
      // this.removeFun(select);
    },
    // 图形放大的方法
    big () {
      this.graph.zoomIn();
    },
    // 图形缩小的方法
    small () {
      this.graph.zoomOut();
    }
  },
  mounted () {
    this.init();
    this.connectFun(); // 监听连线事件
    this.removeEvent();// 监听删除事件
  }
}
</script>

<style>
</style>