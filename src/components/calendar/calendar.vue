<template>
  <div class="calendar"
       ref="calendar"
       v-click-outside>
    <input type="text"
           :value="formaDate">
    <div class="panel"
         v-if="isVisible">
      <div class="panel-nav">
        <span>&lt;</span>
        <span @click="prevMonth">&lt;&lt;</span>
        <span>{{time.year}}年</span>
        <span>{{time.month+1}}月</span>
        <span @click="nextMonth">&gt;&gt;</span>
        <span>&gt;</span>
      </div>
      <div class="panel-content">
        <div class="days">
          <span v-for="j in 7"
                :key="'_'+j"
                class="cell">
            {{weekDays[j-1]}}
          </span>
          <!-- {{visibeDays}} -->
          <div v-for="i in 6"
               :key="i">
            <span v-for="j in 7"
                  :key="j"
                  class="cell cell-days"
                  @click="chooseDate(visibeDays[(i-1)*7+(j-1)])"
                  :class="[
                    {notCurrentMonth:!isCurrentMonth(visibeDays[(i-1)*7+(j-1)])},
                    {today:isToday(visibeDays[(i-1)*7+(j-1)])},
                    {select:isSelect(visibeDays[(i-1)*7+(j-1)])}
                  ]">
              {{visibeDays[(i-1)*7+(j-1)].getDate()}}
            </span>
          </div>

        </div>
      </div>
      <div class="panel-footer">
        今天
      </div>
    </div>
  </div>
</template>

<script>
import * as utils from "./utils";
export default {
  name: 'calendar',
  directives: {
    clickOutside: {
      bind (el, bindings, vnode) {
        let handler = (e) => {
          if (el.contains(e.target)) {
            if (!vnode.context.isVisible) {
              vnode.context.focus()
            }
          } else {
            if (vnode.context.isVisible) {
              vnode.context.blur()
            }
          }
        }
        el.handler = handler;
        document.addEventListener("click", handler)
      }
    }
  },
  props: {
    value: { // 是否显示日历
      type: Date,
      default: () => new Date()
    }
  },
  data () {
    let { year, month } = utils.getNewDate(this.value)
    return {
      isVisible: false,
      weekDays: ["日", "一", "二", "三", "四", "五", "六"],
      time: {
        year,
        month
      }
    }
  },
  mounted () {
  },
  computed: {
    visibeDays () {
      // 获取当前是周几
      let { year, month } = utils.getNewDate(utils.getDate(this.time.year, this.time.month, 1))
      let currentFirstDay = utils.getDate(year, month, 1);
      let week = currentFirstDay.getDay();
      let startDat = currentFirstDay - week * 60 * 60 * 1000 * 24
      let arr = [];
      for (let i = 0; i < 42; i++) {
        arr.push(new Date(startDat + i * 60 * 60 * 1000 * 24))
      }
      return arr;
    },
    formaDate () {
      let { year, month, day } = utils.getNewDate(this.value)
      // return this.value;
      return `${year}-${month + 1}-${day}`
    }
  },
  methods: {
    focus () {
      this.isVisible = true;
    },
    blur () {
      this.isVisible = false;
    },
    isCurrentMonth (date) {
      let { year, month } = utils.getNewDate(utils.getDate(this.time.year, this.time.month, 1));
      let { year: y, month: m } = utils.getNewDate(date);
      return year === y && month === m;
    },
    isToday (date) {
      let { year, month, day } = utils.getNewDate(new Date());
      let { year: y, month: m, day: d } = utils.getNewDate(date);
      return year === y && month === m && day === d;
    },
    chooseDate (date) {
      this.time = utils.getNewDate(date);
      this.$emit("input", date)
      this.blur()
    },
    isSelect (date) {
      let { year, month, day } = utils.getNewDate(this.value);
      let { year: y, month: m, day: d } = utils.getNewDate(date);
      return year === y && month === m && day === d;
    },
    prevMonth () {
      let d = utils.getDate(this.time.year, this.time.month, 1);
      d.setMonth(d.getMonth() - 1)
      this.time = utils.getNewDate(d);
    },
    nextMonth () {
      let d = utils.getDate(this.time.year, this.time.month, 1);
      d.setMonth(d.getMonth() + 1)
      this.time = utils.getNewDate(d);
    }
  }

}
</script>

<style lang="scss" scoped>
@import "./calendar.scss";
</style>