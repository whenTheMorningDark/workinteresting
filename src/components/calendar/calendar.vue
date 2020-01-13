<template>
  <div class="calendar"
       ref="calendar">
    <div class="calendar-header">
      <div class="calendar-header-time">
        {{currentTime.hour}}:{{formatDate(currentTime.minute)}}:{{formatDate(currentTime.second)}}
      </div>
      <div class="calendar-header-date">
        {{currentTime.year}}年{{currentTime.month}}月{{currentTime.day}}日
      </div>
    </div>
    <div class="calendar-container"
         v-if='cShowCalendar'>
      <div class="calendar-container-header">
        <span class="calendar-container-header-date">
          2020年1月13日
        </span>
        <i class='cai-icon-up'>上</i>
        <i class='cai-icon-down'>下</i>
        <span class='container-header-today'>今天</span>
      </div>
      <div class="calendar-week">
        <div v-for="(item, index) in calendarTitleArr"
             :key="index"
             class="week-item">{{item}}</div>
        <div class="calendar-week">
          <div v-for="(item, index) in calendarList"
               :key="index"
               class="week-item date-item"
               :class='[{today:isCurrentDay(item.date)}]'
               @click='chooseDate(item)'>
            <span>{{item.day}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as utils from "./utils";
export default {
  name: 'calendar',
  props: {
    showCalendar: { // 是否显示日历
      type: Boolean,
      default: false
    }
  },
  computed: {
    cShowCalendar () {
      return this.showCalendar;
    }
  },
  data () {
    return {
      calendarTitleArr: [
        'MON',
        'TUE',
        'WED',
        'THU',
        'FRI',
        'SAT',
        'SUN '
      ],
      calendarList: [],
      currentTime: {}
    }
  },
  methods: {
    handleNowData () { // 获取当前时间
      let { year, month, day, hour, minute, second } = utils.getNewDate(new Date())
      this.currentTime = { year, month, day, hour, minute, second };
    },
    // 格式化日期 个人数日期以 0X 的格式显示
    formatDate (date) {
      date = Number(date)
      return date < 10 ? `0${date}` : date
    },
    turnCalendar () {
      this.visibleCalendar(this.currentTime.year, this.currentTime.month); // 加载日历
      this.showCalendar = true;
    },
    // 加载日历
    visibleCalendar (year, month) {
      let obj = utils.getNewDate(utils.getDate(year, month, 1));
      console.log(obj);

    }
  },
  mounted () {
    this.handleNowData()
    this.interval = setInterval(() => {
      this.handleNowData()
    }, 1000)
  },
  watch: {
    cShowCalendar (nVal) {
      if (nVal) {
        console.log("切换");
        this.turnCalendar(); // 切换日历
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./calendar.scss";
</style>