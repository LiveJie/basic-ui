<template>
  <div>
      1132132
    <!-- <test-button></test-button> -->
    <basic-empty></basic-empty>
    <basic-emoji></basic-emoji>
    <basic-page></basic-page>
    <basic-update-image></basic-update-image>
    <basic-loadding-image></basic-loadding-image>
    <Empty />
  </div>
</template>

<script>
// import TestButton from './TestButton'
// import emptyPng from "@/public/images/empty.png"
import Empty from "../packages/empty"
export default {
  components: {
    // TestButton,
    Empty
  },
  data(){
    return {
      
    }
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
