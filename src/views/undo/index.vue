<template>
  <div>
    <draggbleItem :rect="rect" @onTransformed="onTransformed"></draggbleItem>
  </div>
</template>

<script>
import draggbleItem from "./draggbleItem";
export default {
  name: "undo",
  data() {
    return {
      rect: {
        x: 100,
        y: 100,
        w: 100,
        h: 100
      }
    };
  },
  methods: {
    onTransformed(rectEnd) {
      const rect = {};
      const keys = ["x", "y", "w", "h"];
      keys.forEach(key => {
        if (key in rectEnd) {
          rect[key] = rectEnd[key];
        }
      });
      console.log(rectEnd);
      // rect.animation = animation
      this.rect = rect;
    }
  },
  components: {
    draggbleItem
  },
  mounted() {
    console.log(this.$utils.uid());
  }
};
</script>

<style>
</style>