<template>
  <div class="container"
       ref="container">
  </div>
</template>

<script>
import {
  mxGraph,
  mxEvent,
  mxGraphView
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
      this.mxGraphView = new mxGraphView(this.graph)
      // window['mxGraph'] = mxgraph.mxGraph;
      // window.mxStylesheet = mxgraph.mxStylesheet
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
      try {
        for (let i = 0; i < this.graphData.length; i++) {
          let baseOptions = this.graphData[i].options;
          let type = this.graphData[i].type || "";
          let value = this.graphData[i].value || "";
          let id = this.graphData[i].id || null;
          // let optionsStyle = this.graphData[i].optionsStyle || {}; // 获取额外的样式
          let { x, y, width, height, style } = baseOptions;
          let isStyle = Object.keys(style).length <= 0; // 如果没有传递样式属性,则使用默认的样式
          let verter = this.graph.insertVertex(this.parent, id, value, x, y, width, height, isStyle ? "" : this.convertStyleToString(style)); // 生成图形的方法
          // this.setVeterDefaultStyle(styleNode, optionsStyle); // 设置额外的默认样式
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
                let target = this.findCell(arr[i].tId);
                if (!source || !target) {
                  return;
                }
                let edgeStyle = Object.keys(arr[i].style).length <= 0 ? "" : this.convertStyleToString(arr[i].style);
                console.log(edgeStyle);
                this.graph.insertEdge(this.parent, arr[i].id || null, "", source, target, edgeStyle);
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
        let cell = evt.properties.cells;
        this.$emit("delEvent", cell);
      });
    },
    // 设置线条(edge)的样式
    setEdgeStyleFun (edge, style) {
      edge.forEach((v) => {
        let eStyle = this.getEdgeStyle(v)
        let newStyle = Object.assign(JSON.parse(JSON.stringify(eStyle)), style);
        v.setStyle(this.convertStyleToString(newStyle));
        this.graph.refresh(v)
        this.graphData.forEach((s)=>{
          let to = s.to;
          if(to.length > 0) {
            let currentEdge = to.find((d)=>d.id === v.id);
            if(currentEdge) {
              Object.assign(currentEdge.style,style);
            }
          }
        })
      });
      console.log(this.graphData);
    },
    getEdgeStyle (edge) {
      const style = this.graph.view.getState(edge, true).style;
      console.log(style);
      return style;
    },
    // 设置图形样式
    /**
     * cell 为当前选中的cell对象 类型为 Array
     * style 改变当前cell的样式 类型为Object {fillColor:"red"}
     * 
     * 样式修改 https://jgraph.github.io/mxgraph/javascript/examples/grapheditor/www/index.html
     * 
     */
    setVeterStyle (cell, style) {
      if (!(cell instanceof Array)) {
        cell = [cell];
      }
      cell.forEach((s) => {
        let currentData = this.graphData.find((v) => v.id === s.id);
        Object.assign(currentData.options.style, style);
        let newStyle = s.style + this.convertStyleToString(style);
        s.setStyle(newStyle);
        this.graph.refresh(s);
      })
    },
    convertStyleToString (styleDict) { // 把对象转成字符{strokeColor:color} => strokeColor=color;
      const style = Object.entries(styleDict)
        .map(([key, value]) => `${key}=${value}`)
        .join(";");
      return `${style};`;
    },
    // 工具方法
    findCell (id) {
      const cells = this.findAllCell(); // 获取所有的图形
      let cell = cells.find((v) => v.id === id);
      return cell;
    },
    // 获取所有的图形
    findAllCell () {
      return this.graph.getChildVertices(this.graph.getDefaultParent());
    },
    // 删除图形的方法,包括cell和edge
    removeFun (cell) {
      this.graph.removeCells([cell], true);
    },
    // 获取选中的元素
    getSelectionCells () {
      return this.graph.getSelectionCells();
    },
    // 点击图形
    clickCell () {
      this.graph.addListener(mxEvent.CLICK, (sender, evt) => {
        let cell = evt.getProperty("cell");
        console.log(cell);
      });
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

    // this.graph.getStylesheet().putCellStyle(node, style);
    // this.setEdgeStyleFun(); // 设置线条的样式
    this.clickCell();
  }
}
</script>

<style>
</style>