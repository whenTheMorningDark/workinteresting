<template>
  <!-- <div>awsssssome</div> -->
  <canvas ref="canvasDemo"
          :width="canvasSize"
          :height="canvasSize" />
</template>

<script>
export default {
  name: "awesomeProgress",
  props: {
    useGradient: { // 是否允许渐变色
      type: Boolean,
      default: true
    },
    circleRadius: {
      type: Number,
      default: 40
    },
    pointRadius: {
      type: Number,
      default: 6
    },
    percentage: {
      type: Number,
      default: 0
    },
    startDeg: {
      type: Number,
      default: 270
    },
    animated: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    outerRadius () {
      return this.pointRadius > 0 ? (this.circleRadius + this.pointRadius) : (this.circleRadius + this.lineWidth / 2)
    },
    canvasSize () {
      return 2 * this.outerRadius + 'px'
    }
  },
  data () {
    return {
      gradient: null // 渐变色对象
    }
  },
  methods: {
    initCanvas () { // 初始化canvas
      let canvas = this.$refs.canvasDemo;
      let ctx = canvas.getContext("2d");
      // https://www.w3school.com.cn/tags/canvas_createlineargradient.asp
      // if (this.useGradient) {
      //   this.gradient = ctx.createLinearGradient()
      // }
      const endDeg = this.getTargetDegByPercentage(this.startDeg, this.percentage) // 求出结束的圆弧点
      if (this.percentage === 0) {
        this.animateDrawArc(canvas, ctx, this.startDeg, endDeg, 0, 0);
      } else {
        if (this.animated) {
          console.log("animated")
        }
      }
    },
    getTargetDegByPercentage (startDeg, percentage) {
      return (startDeg + 360 * percentage / 100) % 360
    },
    // animateDrawArc (canvas, ctx, startDeg, endDeg, stepNo, stepTotal) { // 画圆的方法
    //   // console.log(canvas.clientWidth)
    //   ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);
    //   const nextDeg = this.
    // },
    // 角度转换成弧度
    deg2Arc (deg) {
      return deg / 180 * Math.PI
    }
  },
  mounted () {
    this.initCanvas()
  }
}
</script>

<style>
</style>