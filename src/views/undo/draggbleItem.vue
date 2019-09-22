<template>
  <div
    class="draggbleItem"
    @mousedown.stop="onMouseDown($event, 'move')"
    :style="rectStyle"
  >
    <div class="rb" @mousedown.stop="onMouseDown($event, 'resizing')"></div>
  </div>
</template>

<script>
// 代码参考 https://github.com/ioslh/undo-redo/blob/master/src/components/Controller.vue

export default {
  name: "draggbleItem",
  props: {
    rect: Object
  },
  data() {
    return {
      resizing: false,
      dragging: false
    };
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
      this.mouseStart = this.mousePosition(e);
      this.reactStart = JSON.parse(JSON.stringify(this.rect));
      // console.log(type);
      this.adjustType = type;
      if (this.adjustType === "resizing") {
        this.resizing = true;
      } else {
        this.dragging = true;
        let oDiv = e.target;
        if (oDiv.className !== "draggbleItem") {
          return;
        }
        this.disX = e.clientX - oDiv.offsetLeft;
        this.disY = e.clientY - oDiv.offsetTop;
      }
      document.addEventListener("mousemove", this.onMouseMove);
      document.addEventListener("mouseup", this.onMouseup);
    },
    onMouseMove(e) {
      if (this.resizing) {
        this.handleResizeMove(e);
      } else {
        this.mouseEnd = this.mousePosition(e);
        const [x, y] = ["x", "y"].map(t =>
          Math.abs(this.mouseEnd[t] - this.mouseStart[t])
        );
        if (x > 2 || y > 2) {
          let rectEnd = {
            x: this.mouseEnd.x - this.disX,
            y: this.mouseEnd.y - this.disY,
            w: this.reactStart.w,
            h: this.reactStart.h
          };
          this.$emit("onTransformed", rectEnd);
        }
      }
    },
    // 处理拉伸的情况
    handleResizeMove(e) {
      // console.log("resize");
      this.resizingStart = this.mousePosition(e);
      // console.log(this.resizingStart);
      // console.log(this.resizingStart.x - this.mouseStart.x);
      const [x, y] = ["x", "y"].map(t =>
        Math.abs(this.resizingStart[t] - this.mouseStart[t])
      );
      console.log(this.reactStart);
      if (x > 2 || y > 2) {
        let rectEnd = {
          x: this.reactStart.x,
          y: this.reactStart.y,
          w: this.reactStart.w + this.resizingStart.x - this.mouseStart.x,
          h: this.reactStart.h + this.resizingStart.y - this.mouseStart.y
        };
        this.$emit("onTransformed", rectEnd);
      }
    },
    onMouseup() {
      this.resizing = false;
      this.dragging = false;
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
  position: relative;
  border: 1px solid red;
  cursor: move;
  .rb {
    width: 25px;
    height: 25px;
    position: absolute;
    bottom: 0;
    right: 0;
    background: red;
  }
}
</style>>

