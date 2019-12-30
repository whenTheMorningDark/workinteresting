<template>
  <div class="home">
    <AwesomeProgress circle-color="#e5e9f2"
                     :circle-width="4"
                     :line-width="10"
                     :circle-radius="60"
                     :point-radius="0"
                     :start-deg="90"
                     :percentage="50" />
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
