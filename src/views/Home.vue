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
  mounted () {
    var arr = [{
      "name": "ZYTX",
      "age": "Y13xG_4wQnOWK1QwJLgg11d0pS4hewePU95UHtpMl3eE81uS74NC-6zu-Rtnw4Ix",
      "gender": "AAAAAA.doc"
    }, {
      "name": "ZYTA",
      "age": "Y13xG_4wQnOWK1QwJLgg11d0pS4hewePU95UHtpMl3eE81uS74NC-6zu-Rtnw4Ix",
      "gender": "BBBBBB.doc"
    }, {
      "name": "ZDTX",
      "age": "Y13xG_4wQnOWK1QwJLgg11d0pS4hewePU95UHtpMl3eE81uS74NC-6zu-Rtnw4Ix",
      "gender": "CCCCCC.doc"
    }, {
      "name": "ZYTX",
      "age": "Y13xG_4wQnOWK1QwJLgg11d0pS4hewePU95UHtpMl3eE81uS74NC-6zu-Rtnw4Ix",
      "gender": "AAAAAA.doc"
    }];
    console.log(this.$utils.uniqeObjectArr(arr, "name"));
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
