<template>
  <invented :data='data'></invented>
</template>

<script>
import invented from "@/components/invented";
export default {
  data() {
    return {
      data: Array.from({ length: 10000 }, (k, v) => ({
        label: v + 1,
        value: v + 1
      }))
    };
  },
  components: {
    invented
  }
};
</script>

<style scoped lang="scss">
</style>
