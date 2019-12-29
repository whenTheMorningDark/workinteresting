<template>
  <div class="home">

    home
    <!-- <mxGraph :graphData="graphData"
             @initCell="initCell"
             @connect="connect"></mxGraph> -->
  </div>
</template>
<script>
export default {
  name: "home",
  components: {},
  data () {
    return {

    };
  },
  methods: {
    func (a, b) {
      return a.name === b.name
    }
  },
  mounted () {
    // let num = [10, 20];
    // console.log(this.$utils.flatten(['a', ['b', ['c', ['q', 's']]], 'd', ['e']]));
    // console.log(new Date("2016-12-13").getTime());
    // console.log(Date.now())
    // 1577327725564
    // console.log(new Date(1560312000000).toLocaleString())
    // console.log(this.$utils.ObjToStr(1));
    // console.log(!isNaN("1a"))
    // console.log(this.$utils.format("2016-12-13"));
    let arr = [1, 2, 4, 5, 2, 5, 7, 7];
    // let arr = [
    //   { name: "a" },
    //   { name: "b" },
    //   { name: "c" },
    //   { name: "a" }
    // ]
    console.log(this.$utils.unique(arr));
  }
};
</script>
<style lang="scss" scoped>
.home {
  width: 500px;
  height: 500px;
  overflow: hidden;
  // height: 500px;
  border: 1px solid #ddd;
  // padding: 20px;
  margin: 0 auto;
}
</style>
