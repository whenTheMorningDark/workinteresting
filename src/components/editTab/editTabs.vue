<template>
  <div class="edit-tab">
    <div class="edit-tab-wrapper"
         :class="wrapperCls">
      <span class="edit-tab__nav-prev"
            @click="scrollPrev"
            v-if="scrollable">
        <i class="el-icon-arrow-left">左</i>
      </span>
      <span class="edit-tab__nav-next"
            @click="scrollNext"
            v-if="scrollable">
        <i class="el-icon-arrow-right">右</i>
      </span>
      <div class="edit-tab-bar-scroll"
           ref="navScroll">
        <div class="edit-tab-bar"
             ref="nav"
             :style="navStyle">
          <div :class="tabCls(item)"
               v-for="(item,index) in navList"
               :key="item.name || index"
               @click="handleChange(item)"
               @dblclick="handDbClick(item)">
            <input v-model="item.label"
                   v-show="item.edit"
                   size="mini"
                   ref="input" />
            <!-- {{item.label}} -->
            <span v-show="!item.edit">
              {{item.label}}
            </span>
            <i class="el-icon-close"
               v-show="!item.edit">x</i>
          </div>
        </div>
      </div>
    </div>

    <div class="edit-tab-content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import { findComponentsDownward } from "./utils"
export default {
  name: "editTab",
  props: {
    value: {
      type: [String, Number]
    }
  },
  provide () {
    return { TabsInstance: this };
  },
  data () {
    return {
      navList: [], // 存放子组件Tab的label和name
      currentValue: this.value, // 当前默认选择tab
      navStyle: {
        transform: ""
      },
      scrollable: false
    }
  },
  computed: {
    wrapperCls () {
      console.log(this.scrollable)
      // return this.scrollable:{padding: 0 32px;}
      if (this.scrollable) {
        return "edit-tab-wrapper32";
      }
      return "";
    }
  },
  methods: {
    scrollPrev () {
      const containerWidth = this.$refs.navScroll.offsetWidth;
      const currentOffset = this.getCurrentScrollOffset();
      if (!currentOffset) {
        return;
      }
      let newOffset = currentOffset > containerWidth ?
        currentOffset - containerWidth :
        0;
      this.setOffset(newOffset);
    },
    scrollNext () {
      const navWidth = this.$refs.nav.offsetWidth;
      const containerWidth = this.$refs.navScroll.offsetWidth;
      const currentOffset = this.getCurrentScrollOffset();
      if (navWidth - currentOffset <= containerWidth) {
        return;
      }
      let newOffset = navWidth - currentOffset > containerWidth * 2 ?
        currentOffset + containerWidth :
        (navWidth - containerWidth);
      this.setOffset(newOffset);
    },
    //获取子组件下tab的数量
    getTabs () {
      const allTabPanes = findComponentsDownward(this, 'TabPane'); // 找到下方name为tabpane组件
      return allTabPanes;
    },
    // 设置tabitem样式

    tabCls (item) {
      // console.log(item);
      return [
        "edit-tab-item",
        {
          ["edit-tab-item-active"]: item.name === this.currentValue
        }
      ];
    },
    // 更新头部label和name
    updateNav () {
      this.navList = [];
      this.getTabs().forEach((pane, index) => {
        if (!pane.name) { // 没有name的容错判断
          pane.name = index;
        }
        if (index === 0) {
          if (!this.currentValue) {
            this.currentValue = pane.name || index
          }
        }
        this.navList.push({
          label: pane.label,
          name: pane.name || index,
          edit: pane.edit
        })
      });
      this.updateStatus();
      this.updateBar();
      // console.log(this.navList)
    },
    // 控制tab内容是否显示
    updateStatus () {
      const tabs = this.getTabs();
      tabs.forEach(tab => tab.show = (tab.name === this.currentValue));
    },
    // 点击切换内容和active状态
    handleChange (item) {
      const nav = this.navList.find(v => v.name === item.name);
      this.currentValue = nav.name;
      this.$emit("tab-click", nav);
    },
    // 双击
    handDbClick (item) {
      this.$set(item, "edit", true);
      this.$emit("db-tab-click", item);
    },

    getCurrentScrollOffset () {
      const { navStyle } = this;
      return navStyle.transform
        ? Number(navStyle.transform.match(/translateX\(-(\d+(\.\d+)*)px\)/)[1])
        : 0;
    },
    setOffset (value) {
      console.log(value)
      this.navStyle.transform = `translateX(-${value}px)`;
    },
    // 更新navbar的外围宽度
    updateBar () {
      this.$nextTick(() => {
        this.updateNavScroll();
      })
    },
    updateNavScroll () {
      console.log(this.$refs.nav);
      const navWidth = this.$refs.nav.offsetWidth;
      const containerWidth = this.$refs.navScroll.offsetWidth;
      const currentOffset = this.getCurrentScrollOffset();
      console.log(currentOffset);
      console.log(navWidth);
      console.log(containerWidth)
      if (containerWidth < navWidth) {
        this.scrollable = true;
        // console
        // this.setOffset(navWidth - containerWidth);
        // if (navWidth - currentOffset < containerWidth) {
        //   this.setOffset(navWidth - containerWidth);
        // }
      } else {
        this.scrollable = false;
        if (currentOffset > 0) {
          this.setOffset(0);
        }
      }
    },
    scrollToActiveTab () {
      console.log(this.scrollable)
      if (!this.scrollable) {
        return;
      }
      const nav = this.$refs.nav;
      const activeTab = this.$el.querySelector(".edit-tab-item-active");
      if (!activeTab) {
        return;
      }
      const navScroll = this.$refs.navScroll;
      const activeTabBounding = activeTab.getBoundingClientRect();
      const navScrollBounding = navScroll.getBoundingClientRect();
      const navBounding = nav.getBoundingClientRect();
      const currentOffset = this.getCurrentScrollOffset();
      let newOffset = currentOffset;
      console.log(activeTab)
      if (navBounding.right < navScrollBounding.right) {
        newOffset = nav.offsetWidth - navScrollBounding.width;
        console.log(newOffset)

      }
      if (activeTabBounding.left < navScrollBounding.left) {
        newOffset = currentOffset - (navScrollBounding.left - activeTabBounding.left);
        console.log(newOffset)
      } else if (activeTabBounding.right > navScrollBounding.right) {
        newOffset = currentOffset + activeTabBounding.right - navScrollBounding.right;
        console.log(newOffset)
      }
      console.log(newOffset);
      if (currentOffset !== newOffset) {
        console.log(newOffset)
        this.setOffset(Math.max(newOffset, 0));
      }
    },
  },
  watch: {
    value (val) {
      this.currentValue = val;
    },
    currentValue () {
      this.updateBar();
      this.updateStatus();
      this.$nextTick(() => {
        this.scrollToActiveTab();
      });
    }
  }

}
</script>
<style lang="scss" scope>
.edit-tab {
  width: 100%;
  position: relative;
}
.edit-tab-wrapper32 {
  padding: 0 32px;
}
.edit-tab-bar-scroll {
  overflow: hidden;
}
.edit-tab__nav-prev {
  width: 32px;
  text-align: center;
  position: absolute;
  line-height: 44px;
  cursor: pointer;
  left: 0;
}
.edit-tab__nav-next {
  width: 32px;
  text-align: center;
  position: absolute;
  line-height: 44px;
  cursor: pointer;
  right: 0;
}
.edit-tab-bar {
  white-space: nowrap;
  position: relative;
  transition: transform 0.3s;
  float: left;
  z-index: 2;
  /* border: 1px solid #e4e7ed; */
  border-bottom: none;
  border-radius: 4px 4px 0 0;
  box-sizing: border-box;
}
.edit-tab-item {
  padding: 0 20px;
  height: 40px;
  box-sizing: border-box;
  line-height: 40px;
  display: inline-block;
  list-style: none;
  font-size: 14px;
  font-weight: 500;
  color: #303133;
  position: relative;
  border: 1px solid #e4e7ed;
  margin-right: 6px;
  /* border-left: 1px solid #e4e7ed; */
  transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
    padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  cursor: pointer;
  .el-icon-close {
    position: relative;
    font-size: 12px;
    width: 0;
    height: 14px;
    vertical-align: middle;
    line-height: 15px;
    overflow: hidden;
    top: -1px;
    right: -2px;
    transform-origin: 100% 50%;
    border-radius: 50%;
    text-align: center;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    margin-left: 5px;
  }
  &:hover {
    .el-icon-close {
      width: 12px;
    }
  }
  /* &:first-child {
    border-left: none;
  } */
  &.edit-tab-item-active {
    border-bottom-color: #fff;
    color: #409eff;
    .el-icon-close {
      width: 12px;
    }
  }
}
.el-icon-close:hover {
  background: #dddddd;
  color: #fff;
}
</style>