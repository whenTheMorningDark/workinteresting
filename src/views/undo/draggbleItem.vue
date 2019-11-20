<template>
  <div class="draggbleItem"
       @mousedown.stop="onMouseDown($event, 'move')"
       :style="rectStyle">
    <div class="rb"
         @mousedown.stop="onMouseDown($event, 'resizing')"></div>
    <div class="lb"
         @mousedown.stop="onMouseDown($event, 'resizing')"></div>
  </div>
</template>

<script>
// 代码参考 https://github.com/ioslh/undo-redo/blob/master/src/components/Controller.vue
// https://github.com/mauricius/vue-draggable-resizable/blob/master/src/components/vue-draggable-resizable.vue

export default {
  name: "draggbleItem",
  props: {
    rect: Object
  },
  data () {
    return {
      resizing: false,
      dragging: false
    };
  },
  computed: {
    rectStyle () {
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
    mousePosition (e) {
      // 动态计算鼠标的位置
      const { pageX, pageY } = e;
      return {
        x: pageX,
        y: pageY
      };
    },
    onMouseDown (e, type) {
      // 鼠标按下的触发
      this.mouseStart = this.mousePosition(e);
      this.reactStart = JSON.parse(JSON.stringify(this.rect));
      // let oDiv = e.target;
      // console.log(type);
      this.adjustType = type;
      if (this.adjustType === "resizing") {
        this.resizing = true;
        // console.log(e);
        // if(e.target.className === "lb"){
        //   console.log()
        // }
      } else {
        this.dragging = true;
        let oDiv = e.target;
        if (oDiv.className !== "draggbleItem") {
          return;
        }
        this.disX = e.clientX - oDiv.offsetLeft; // 求出第一次x的距离
        this.disY = e.clientY - oDiv.offsetTop; // 求出第一次y的距离
      }
      document.addEventListener("mousemove", this.onMouseMove);
      document.addEventListener("mouseup", this.onMouseup);
    },
    onMouseMove (e) {
      this.mouseEnd = this.mousePosition(e);
      console.log(Math.abs(this.mouseEnd.x - this.mouseStart.x));
      const [x, y] = ["x", "y"].map(t =>
        Math.abs(this.mouseEnd[t] - this.mouseStart[t])
      );
      if (x > 2 || y > 2) {
        let rectEnd = {
          x: this.dragging ? this.mouseEnd.x - this.disX : this.reactStart.x,
          y: this.dragging ? this.mouseEnd.y - this.disY : this.reactStart.y,
          w: this.dragging
            ? this.reactStart.w
            : this.reactStart.w + Math.abs(this.mouseEnd.x - this.mouseStart.x),
          h: this.dragging
            ? this.reactStart.h
            : this.reactStart.h + this.mouseEnd.y - this.mouseStart.y
        };
        this.$emit("onTransformed", rectEnd);
      }
    },
    onMouseup () {
      this.resizing = false;
      this.dragging = false;
      this.$emit("record");
      document.removeEventListener("mousemove", this.onMouseMove);
      document.removeEventListener("mouseup", this.onMouseUp);
    },
    preventDrag (e) {
      e.stopPropagation();
      e.preventDefault();
    }
  },
  mounted () {
    document.addEventListener("drag", this.preventDrag);
    document.addEventListener("dragstart", this.preventDrag);
  },
  beforeDestroy () {
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
  .rb {
    width: 25px;
    height: 25px;
    position: absolute;
    bottom: 0;
    right: 0;
    background: red;
  }
  .lb {
    width: 25px;
    height: 25px;
    position: absolute;
    bottom: 0;
    left: 0;
    background: red;
  }
}
</style>>

