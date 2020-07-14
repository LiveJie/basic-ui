<template>
  <div>
      1132132
    <!-- <test-button></test-button> -->
    <basic-empty></basic-empty>
    <basic-emoji></basic-emoji>
  </div>
</template>

<script>
// import TestButton from './TestButton'
export default {
  components: {
    // TestButton,
  },
  mounted() {
      console.log(this)
  }
}
</script>

<style lang="scss" scoped>
.row {
  padding: 10px 0;
}
.hm-button {
  margin-left: 10px;
}
</style>
