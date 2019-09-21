<template>
  <div class="list-view" @scroll="handleScroll">
    <!-- list-view-phantom 撑开容器，以便出现滚动条 -->
    <div class="list-view-phantom" :style="{
         height: contentHeight
      }"></div>
    <div ref="content" class="list-view-content">
      <div
        class="list-view-item"
        :style="{
          height: itemHeight + 'px'
        }"
        v-for="item in visibleData"
        :key="item.value"
      >{{ item.value }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListView",
  props: {
    data: {
      // 传递过来的数据
      type: Array,
      required: true
    },
    itemHeight: {
      // 默认列表的高度
      type: Number,
      default: 30
    }
  },
  data() {
    return {
      visibleData: [] // 可视的数据
    };
  },
  computed: {
    contentHeight() {
      return this.data.length * this.itemHeight + "px";
    }
  },
  methods: {
    updateVisibleData(scrollTop) {
      // console.log(1);
      scrollTop = scrollTop || 0;
      const visibleData = Math.ceil(this.$el.clientHeight / this.itemHeight); // 向上取整
      const start = Math.floor(scrollTop / this.itemHeight); // 向下取整
      const end = start + visibleData; // 结束有多少个
      this.visibleData = this.data.slice(start, end); // slice不会直接触发视图更新，需要赋值
      this.$refs.content.style.webkitTransform = `translate3d(0, ${start *
        this.itemHeight}px, 0)`;
    },
    handleScroll() {
      // console.log("ss");
      const scrollTop = this.$el.scrollTop;
      // console.log(scrollTop);
      this.updateVisibleData(scrollTop);
    }
  },
  mounted() {
    this.updateVisibleData(); // 数据更新
  }
};
</script>

<style scoped lang="scss">
// 列表元素（.list-view）使用相对定位
// 使用一个不可见元素（.list-view-phantom）撑起这个列表，让列表的滚动条出现
// 列表的可见元素（.list-view-content）使用绝对定位，left、right、top 设置为 0
.list-view {
  height: 400px;
  overflow: auto;
  position: relative;
  border: 1px solid #aaa;
}

.list-view-phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}

.list-view-content {
  left: 0;
  right: 0;
  top: 0;
  position: absolute;
}

.list-view-item {
  padding: 5px;
  color: #666;
  line-height: 30px;
  box-sizing: border-box;
}
</style>
