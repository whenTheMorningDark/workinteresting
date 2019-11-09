<template>
  <div class="home">
    <!-- <Icon type="icon-jiantouxia"></Icon> -->
    <Collapse v-model="value1">
      <Panel name="1" class="ka-collapse-item-active">
        <span>标题1</span>
        <p slot="content">标题1的内容</p>
      </Panel>
      <Panel name="2">
        <span>标题2</span>
        <p slot="content">标题2的内容</p>
      </Panel>
      <Panel name="3">
        <span>标题2</span>
        <p slot="content">标题2的内容</p>
      </Panel>
      <Panel name="4">
        <span>标题2</span>
        <p slot="content">标题2的内容</p>
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
      value1: "1"
    };
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
