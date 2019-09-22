<template>
  <div
    class="draggbleItem"
    @mousedown.stop="onMouseDown($event, 'move')"
    :style="rectStyle"
  >
    item
  </div>
</template>

<script>
// 代码参考 https://github.com/ioslh/undo-redo/blob/master/src/components/Controller.vue
export default {
  name: "draggbleItem",
  props: {
    rect: Object
  },
  computed: {
    rectStyle() {
      const { x, y, w, h } = this.rect;
      const style = {
        left: `${x}px`,
        top: `${y}px`,
        width: `${w}px`,
        height: `${h}px`
      };
      return style;
    }
  },
  methods: {
    mousePosition(e) {
      // 动态计算鼠标的位置
      const { pageX, pageY } = e;
      return {
        x: pageX,
        y: pageY
      };
    },
    onMouseDown(e, type) {
      // 鼠标按下的触发
      console.log(e);
      let oDiv = e.target;
      // console.log(oDiv);

      if (!oDiv) {
        return;
      }
      this.mouseStart = this.mousePosition(e);
      this.disX = e.clientX - oDiv.offsetLeft;
      this.disY = e.clientY - oDiv.offsetTop;
      this.reactStart = JSON.parse(JSON.stringify(this.rect));
      document.addEventListener("mousemove", this.onMouseMove);
      document.addEventListener("mouseup", this.onMouseup);
    },
    onMouseMove(e) {
      console.log("move");
      this.mouseEnd = this.mousePosition(e);

      // console.log(this.mouseEnd);
      const [x, y] = ["x", "y"].map(t =>
        Math.abs(this.mouseEnd[t] - this.mouseStart[t])
      );
      if (x > 2 || y > 2) {
        let rectEnd = {
          x: this.mouseEnd.x - this.disX,
          y: this.mouseEnd.y - this.disY,
          w: 100,
          height: 100
        };
        this.$emit("onTransformed", rectEnd);
      }
    },
    onMouseup() {
      document.removeEventListener("mousemove", this.onMouseMove);
      document.removeEventListener("mouseup", this.onMouseUp);
    },
    preventDrag(e) {
      e.stopPropagation();
      e.preventDefault();
    }
  },
  mounted() {
    document.addEventListener("drag", this.preventDrag);
    document.addEventListener("dragstart", this.preventDrag);
  },
  beforeDestroy() {
    document.removeEventListener("drag", this.preventDrag);
    document.removeEventListener("dragstart", this.preventDrag);
  }
};
</script>

<style lang="scss" scoped>
.draggbleItem {
  position: absolute;
  border: 1px solid red;
  cursor: move;
}
</style>>

