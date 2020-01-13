<template>
  <div class="home">
    <Calendar v-calendarDrag
              @headerEvent="headerEvent"
              :showCalendar="showCalendar"></Calendar>

  </div>
</template>
<script>
import calendarDrag from "@/directive";

export default {
  name: "home",
  directives: { calendarDrag },
  components: {
  },
  data () {
    return {
      showCalendar: false
    }
  },
  methods: {
    handClick () {
      // console.log(this.$Message)
      this.$Message.info({
        content: "666"
      })
    },
    headerEvent (type) {
      console.log(type);
      if (type === "click") {
        this.showCalendar = !this.showCalendar;
      }
    }
  },
  mounted () {
    // let reg = new RegExp('a');
    console.log(this.$utils.isRegExp("a"))
  },
};
</script>
<style lang="scss" scoped>
.home {
  height: 500px;
  overflow: hidden;
  // height: 500px;
  padding: 10px;
  border: 1px solid #ddd;
  // padding: 20px;
  margin: 0 auto;
}
</style>
