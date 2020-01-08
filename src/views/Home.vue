<template>
  <div class="home">
    <Table></Table>

  </div>
</template>
<script>
export default {
  name: "home",
  components: {

  },
  data () {
    return {

    };
  },
  methods: {
    handClick (obj, index) {
      console.log(obj, index)
    }
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
