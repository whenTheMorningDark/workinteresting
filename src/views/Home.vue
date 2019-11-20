<template>
  <div class="home">
    <Dropdown>
      <Button type="primary">
        下拉框
        <Icon type="icondown"></Icon>
      </Button>
    </Dropdown>
  </div>
</template>
<script>
export default {
  name: "home",
  components: {},
  data () {
    return {
      value1: "1",
      list: [
        { name: "1", title: "标题1", content: "标题112312321的内容" },
        { name: "2", title: "标题2", content: "标题2的内容" },
        { name: "3", title: "标题3", content: "标题3的内容" },
        { name: "4", title: "标题4", content: "标题4的内容" }
      ],
      isLoading: false
    };
  },
  methods: {
    changFun (val) {
      console.log(val);
    },
    handleClick () {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 2000)
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
