<template>
  <div class="empty-wrapper">
    <img :src="imgUrl" alt="">
    <p>暂无相关内容</p>
  </div>
</template>

<script>
export default {
    name: 'BasicEmpty',
    components: {
    },
    data () {
        return {
          imgUrl: require("@/packages/static/images/empty.png")
        }
    },
    mounted () {
    },
    methods: {
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.empty-wrapper {
  width: 100%;
  height: 100%;
  z-index: 1;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fff;
  p {
    position: relative;
    bottom: 50px;
    color: #999;
  }
}
</style>
