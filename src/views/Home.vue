<template>
  <div class="home">
    <editTabs :value="currentValue">
      <Tab label="字典1"
           name="first"
           :edit="isEdit">
        字典一的内容
      </Tab>
      <Tab label="字典2"
           name="second"
           :edit="isEdit">
        字典二的内容
      </Tab>
      <Tab label="字典3"
           name="third"
           :edit="isEdit">
        字典三的内容
      </Tab>
      <Tab label="字典4"
           name="forth"
           :edit="isEdit">
        字典4的内容
      </Tab>
      <Tab label="字典4a"
           name="a"
           :edit="isEdit">
        字典4a的内容
      </Tab>
      <Tab label="字典4b"
           name="b"
           :edit="isEdit">
        字典4b的内容
      </Tab>
    </editTabs>

  </div>
</template>
<script>

export default {
  name: "home",
  components: {
  },
  data () {
    return {
      currentValue: "first",
      isEdit: false
    }
  },
  methods: {

  }
};
</script>
<style lang="scss" scoped>
.home {
  width: 300px;
  height: 500px;
  overflow: hidden;
  // height: 500px;
  padding: 10px;
  border: 1px solid #ddd;
  // padding: 20px;
  margin: 0 auto;
}
</style>
