<template>
  <div class="mxGraph">
    <ToolBar :icons="icons"></ToolBar>
    <Graph :graphData="graphData"
           @initCell="initCell"
           @connect="connect"></Graph>
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
  methods: {
    initCell (cell) {
      this.$emit("initCell", cell);
    },
    connect (options) {
      this.$emit("connect", options);
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