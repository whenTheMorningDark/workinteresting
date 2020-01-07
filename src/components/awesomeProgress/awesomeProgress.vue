<template>
  <!-- <div>awsssssome</div> -->
  <canvas ref="canvasDemo"
          :width="canvasSize"
          :height="canvasSize" />
</template>

<script>
// 参考于https://github.com/cumt-robin/vue-awesome-progress/blob/master/src/components/index.vue
import BezierEasing from "bezier-easing";
export default {
  name: "awesomeProgress",
  props: {
    // 进度圆开始的角度
    startDeg: {
      type: Number,
      default: 270,
      validator: function (value) {
        return value >= 0 && value < 360
      }
    },
    // 进度圆的百分比
    percentage: {
      type: Number,
      default: 0,
      validator: function (value) {
        return value >= 0 && value <= 100
      }
    },
    // 底部圆的半径
    circleRadius: {
      type: Number,
      default: 40
    },
    // 底部圆的线条宽度
    circleWidth: {
      type: Number,
      default: 2
    },
    // 底部圆的颜色
    circleColor: {
      type: String,
      default: '#e5e5e5'
    },
    // 进度圆的线条宽度
    lineWidth: {
      type: Number,
      default: 8
    },
    useGradient: {
      type: Boolean,
      default: true
    },
    lineColor: {
      type: String,
      default: '#3B77E3'
    },
    // 渐变色的数组
    lineColorStops: {
      type: Array,
      default: function () {
        return [
          { percent: 0, color: '#13CDE3' },
          { percent: 1, color: '#3B77E3' }
        ]
      }
    },
    showText: {
      type: Boolean,
      default: true
    },
    fontSize: {
      type: Number,
      default: 14
    },
    fontColor: {
      type: String,
      default: '#3B77E3'
    },
    // 进度圆小球上的半径
    pointRadius: {
      type: Number,
      default: 6
    },
    // 进度圆小球上的颜色
    pointColor: {
      type: String,
      default: '#3B77E3'
    },
    // 是否启用动画
    animated: {
      type: Boolean,
      default: true
    },
    // 动画函数
    easing: {
      type: String,
      // ease-in
      default: '0.42,0,1,1',
      validator: function (value) {
        return /^(\d+(\.\d+)?,){3}\d+(\.\d+)?$/.test(value)
      }
    },
    // 时长
    duration: {
      type: Number,
      // 浏览器大约是60FPS，因此1s大约执行60次requestAnimationFrame
      default: 1
    },
    format: {
      type: Function
    }
  },
  computed: {
    // 外圆的小圆点半径
    outerRadius () {
      return this.pointRadius > 0 ? (this.circleRadius + this.pointRadius) : (this.circleRadius + this.lineWidth / 2)
    },
    canvasSize () {
      return 2 * this.outerRadius + 'px'
    },
    steps () {
      return this.duration * 60
    }
  },
  data () {
    return {
      gradient: null, // 渐变色对象
      easingFunc: null // 动画函数
    }
  },
  methods: {
    initCanvas () { // 初始化canvas
      let canvas = this.$refs.canvasDemo;
      let ctx = canvas.getContext("2d");
      // https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/createLinearGradient
      // if (this.useGradient) {
      //   this.gradient = ctx.createLinearGradient()
      // }
      const endDeg = this.getTargetDegByPercentage(this.startDeg, this.percentage) // 求出结束的圆弧点
      if (this.useGradient) {
        this.gradient = ctx.createLinearGradient(this.circleRadius, 0, this.circleRadius, this.circleRadius * 2);
        this.lineColorStops.forEach(item => {
          this.gradient.addColorStop(item.percent, item.color);
        });
      }
      if (this.percentage === 0) {
        this.animateDrawArc(canvas, ctx, this.startDeg, endDeg, 0, 0);
      } else {
        if (this.animated) {
          // 用动画来画动态内容
          this.animateDrawArc(canvas, ctx, this.startDeg, endDeg, 1, this.steps);
        } else {
          this.animateDrawArc(canvas, ctx, this.startDeg, endDeg, this.steps, this.steps);
        }
      }
    },
    // 求出结束的角度
    getTargetDegByPercentage (startDeg, percentage) {
      return (startDeg + 360 * percentage / 100) % 360
    },
    // 求出每一帧的度数
    getTargetDeg (startDeg, endDeg, stepNo, stepTotal) {
      if (stepTotal === 0) {
        return startDeg;
      }
      startDeg = startDeg % 360;
      endDeg = endDeg % 360;
      if (startDeg > endDeg) {
        const diff = endDeg + 360 - startDeg
        // console.log(diff);
        let nextDeg = startDeg + diff * this.easingFunc(stepNo / stepTotal)
        if (nextDeg > 360) {
          nextDeg = nextDeg - 360
          return nextDeg > endDeg ? endDeg : nextDeg;
        }
        return nextDeg;
      } else if (startDeg < endDeg) {
        const diff = endDeg - startDeg;
        let nextDeg = startDeg + diff * this.easingFunc(stepNo / stepTotal);
        if (nextDeg > endDeg) {
          return endDeg;
        } else if (nextDeg > 360) {
          return nextDeg - 360;
        }
        return nextDeg
      } else {
        return startDeg + 360 * this.easingFunc(stepNo / stepTotal)
      }
    },
    animateDrawArc (canvas, ctx, startDeg, endDeg, stepNo, stepTotal) { // 画圆的方法
      // console.log(canvas.clientWidth)
      window.requestAnimationFrame(() => {
        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
        const nextDeg = this.getTargetDeg(startDeg, endDeg, stepNo, stepTotal);
        const startArc = this.deg2Arc(startDeg);
        const nextArc = this.deg2Arc(nextDeg);
        ctx.strokeStyle = this.circleColor;
        ctx.lineWidth = this.circleWidth;
        ctx.beginPath();
        ctx.arc(this.outerRadius, this.outerRadius, this.circleRadius, 0, this.deg2Arc(360));
        ctx.stroke();
        // 画文字
        if (this.showText) {
          ctx.font = `${this.fontSize}px Arial,"Microsoft YaHei"`
          ctx.fillStyle = this.fontColor;
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          const currPercentage = stepTotal > 0 ? this.easingFunc(stepNo / stepTotal) * this.percentage : 0;
          let label;
          if (typeof this.format === 'function') {
            label = this.format(currPercentage)
          } else {
            label = Math.round(currPercentage) + '%'
          }
          ctx.fillText(label, canvas.clientWidth / 2, canvas.clientWidth / 2);
        }
        // 画进度弧线
        if (stepTotal > 0) {
          ctx.strokeStyle = this.useGradient ? this.gradient : this.lineColor;
          ctx.lineWidth = this.lineWidth;
          ctx.beginPath();
          ctx.arc(this.outerRadius, this.outerRadius, this.circleRadius, startArc, nextArc);
          ctx.stroke();
        }
        // 画点
        if (this.pointRadius > 0) {
          ctx.fillStyle = this.pointColor;
          const pointPosition = this.getPositionsByDeg(nextDeg);
          ctx.beginPath();
          ctx.arc(pointPosition.x + this.pointRadius, pointPosition.y + this.pointRadius, this.pointRadius, 0, this.deg2Arc(360));
          ctx.fill();
        }
        if (stepNo !== stepTotal) {
          stepNo++;
          this.animateDrawArc(canvas, ctx, startDeg, endDeg, stepNo, stepTotal)
        }
      })
    },
    // // 根据角度获取点的位置
    getPositionsByDeg (deg) {
      console.log(deg)
      let x = 0;
      let y = 0;
      if (deg >= 0 && deg <= 90) {
        // 0~90度
        x = this.circleRadius * (1 + Math.cos(this.deg2Arc(deg)))
        y = this.circleRadius * (1 + Math.sin(this.deg2Arc(deg)))
      } else if (deg > 90 && deg <= 180) {
        // 90~180度
        x = this.circleRadius * (1 - Math.cos(this.deg2Arc(180 - deg)))
        y = this.circleRadius * (1 + Math.sin(this.deg2Arc(180 - deg)))
      } else if (deg > 180 && deg <= 270) {
        // 180~270度
        x = this.circleRadius * (1 - Math.sin(this.deg2Arc(270 - deg)))
        y = this.circleRadius * (1 - Math.cos(this.deg2Arc(270 - deg)))
      } else {
        // 270~360度
        x = this.circleRadius * (1 + Math.cos(this.deg2Arc(360 - deg)))
        y = this.circleRadius * (1 - Math.sin(this.deg2Arc(360 - deg)))
      }
      return { x, y }
    },
    // 角度转换成弧度
    deg2Arc (deg) {
      return deg / 180 * Math.PI
    }
  },
  mounted () {
    const easingParams = this.easing.split(',').map(item => Number(item))
    this.easingFunc = BezierEasing(...easingParams);
    this.$nextTick(() => {
      this.initCanvas()
    })
  }
}
</script>

<style>
</style>