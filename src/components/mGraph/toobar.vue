<template>
  <div class="toolbar"
       v-if="cIcons.length > 0">
    <div class="toolbar-item"
         v-for="(item,index) in cIcons"
         :key="index"
         @click="handClick(item)">
      <Icon :type="item.src"></Icon>
    </div>
  </div>
</template>

<script>
export default {
  name: "mxToolbar",
  props: {
    icons: {
      type: Array,
      default: () => {
        return []
      }
    } // 获取父组件传递的icon数据
  },
  data () {
    return {
      defaltIcon: [
        { src: "icondelete" },
        { src: "iconbig" },
        { src: "iconsuoxiao" }
      ]
    }
  },
  computed: {
    cIcons () {
      return this.defaltIcon.concat(this.icons);
    }
  },
  methods: {
    handClick (item) {
      this.$emit("handClick", item);
    }
  }
}
</script>

<style>
</style>