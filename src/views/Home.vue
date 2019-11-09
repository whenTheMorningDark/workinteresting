<template>
  <div class="home">
    <Collapse v-model="value1" @on-change="changFun">
      <Panel name="1">
        <span>标题1</span>
        <p slot="content">标题1的内容</p>
      </Panel>
      <Panel name="2">
        <span>标题2</span>
        <p slot="content">标题2的内容</p>
      </Panel>
      <Panel name="3">
        <span>标题3</span>
        <p slot="content">标题3的内容</p>
      </Panel>
      <Panel name="4">
        <span>标题4</span>
        <p slot="content">标题4的内容</p>
      </Panel>
    </Collapse>
  </div>
</template>
<script>
export default {
  name: "home",
  components: {},
  data() {
    return {
      value1: "1",
      list: [
        { name: "1", title: "标题1", content: "标题112312321的内容" },
        { name: "2", title: "标题2", content: "标题2的内容" },
        { name: "3", title: "标题3", content: "标题3的内容" },
        { name: "4", title: "标题4", content: "标题4的内容" }
      ]
    };
  },
  methods: {
    changFun(val) {
      console.log(val);
    }
  }
};
</script>
<style lang="scss" scoped>
.home {
  width: 500px;
  overflow: hidden;
  // height: 500px;
  border: 1px solid #ddd;
  padding: 20px;
  margin: 0 auto;
}
</style>
