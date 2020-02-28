<template>
  <div v-show="show">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "TabPane",
  inject: ["TabsInstance"],
  props: {
    label: {
      type: [String, Number]
    },
    name: {
      type: [String, Number]
    },
    edit: {
      type: [Boolean]
    }
  },
  data () {
    return {
      show: true
    }
  },
  methods: {
    updateNav () {
      // this.$parent.updateNave();
      this.TabsInstance.updateNav();
    }
  },
  watch: {
    label () {
      this.updateNav();
    },
  },
  mounted () {
    this.updateNav();
  }
}
</script>