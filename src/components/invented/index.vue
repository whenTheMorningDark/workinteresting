<template>
  <div class="list-view" @scroll="handleScroll">
    <!-- list-view-phantom 撑开容器，以便出现滚动条 -->
    <div
      class="list-view-phantom"
      :style="{
        height: contentHeight
      }"
    ></div>
    <div ref="content" class="list-view-content">
      <div
        class="list-view-item"
        :style="{
          height: itemHeight + 'px'
        }"
        v-for="item in visibleData"
        :key="item.value"
      >
        {{ item.value }}
      </div>
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
      visibleData: [], // 可视的数据
      itemSizeGetter: Function
    };
  },
  computed: {
    contentHeight() {
      const { data, itemSizeGetter } = this;
      console.log(itemSizeGetter);
      let total = 0;
      for (let i = 0, j = data.length; i < j; i++) {
        total += itemSizeGetter.call(null, data[i], i);
      }
      return total;
    }
  },
  methods: {
    findNearestItemIndex(scrollTop) {
      const { data, itemSizeGetter } = this;
      let total = 0;
      for (let i = 0, j = data.length; i < j; i++) {
        const size = itemSizeGetter.call(null, data[i], i);
        total += size;
        if (total >= scrollTop || i === j - 1) {
          return i;
        }
      }
      return 0;
    },
    getItemSizeAndOffset(index) {
      const { data, itemSizeGetter } = this;
      let total = 0;
      for (let i = 0, j = Math.min(index, data.length - 1); i <= j; i++) {
        const size = itemSizeGetter.call(null, data[i], i);
        if (i === j) {
          return {
            offset: total,
            size
          };
        }
        total += size;
      }
      return {
        offset: 0,
        size: 0
      };
    },
    updateVisibleData(scrollTop) {
      scrollTop = scrollTop || 0;
      const start = this.findNearestItemIndex(scrollTop);
      const end = this.findNearestItemIndex(scrollTop + this.$el.clientHeight);
      this.visibleData = this.data.slice(
        start,
        Math.min(end + 1, this.data.length)
      );
      this.$refs.content.style.webkitTransform = `translate3d(0, ${
        this.getItemSizeAndOffset(start).offset
      }px, 0)`;
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
