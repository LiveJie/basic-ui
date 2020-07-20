<template>
  <div class="empty-wrapper">
    <!-- <img :src="imgUrl" alt=""> -->
    <!-- <img src="@/packages/static/images/empty.png" alt=""> -->
    <div class="img">
      <svg t="1595226691894" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14877" width="200" height="200"><path d="M504 849.6a59.2 59.2 0 0 1-25.6-6.4l-252.8-120a59.2 59.2 0 0 1-33.6-52.8V512a16 16 0 0 1 32 0v158.4a27.2 27.2 0 0 0 16 24l252.8 120a27.2 27.2 0 0 0 22.4 0L768 694.4a27.2 27.2 0 0 0 16-24V512a16 16 0 0 1 32 0v158.4a59.2 59.2 0 0 1-33.6 52.8l-252.8 120a59.2 59.2 0 0 1-25.6 6.4zM809.6 352h-8l-280-144a27.2 27.2 0 0 0-22.4 0l-273.6 142.4a16 16 0 1 1-14.4-28.8l273.6-142.4a59.2 59.2 0 0 1 51.2 0L816 321.6a16 16 0 0 1-8 30.4z" fill="#bfbfbf" p-id="14878"></path><path d="M510.4 494.4a59.2 59.2 0 0 1-25.6-6.4l-272-139.2a16 16 0 1 1 14.4-28.8l272 139.2a25.6 25.6 0 0 0 22.4 0l283.2-136a16 16 0 1 1 14.4 28.8l-283.2 137.6a59.2 59.2 0 0 1-25.6 4.8z" fill="#bfbfbf" p-id="14879"></path><path d="M512 848a16 16 0 0 1-16-16V529.6l-70.4 91.2a16 16 0 0 1-20.8 4.8L120 468.8a16 16 0 0 1-4.8-24l89.6-120a16 16 0 1 1 25.6 19.2l-78.4 105.6 256 140.8 91.2-116.8a16 16 0 0 1 28.8 9.6V832a16 16 0 0 1-16 16z" fill="#bfbfbf" p-id="14880"></path><path d="M609.6 627.2a16 16 0 0 1-12.8-6.4l-99.2-128a16 16 0 1 1 25.6-19.2l91.2 116.8 256-140.8-75.2-105.6a16 16 0 0 1 25.6-19.2l84.8 120a16 16 0 0 1-4.8 24l-283.2 156.8z" fill="#bfbfbf" p-id="14881"></path></svg>
    </div>
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
          // imgUrl: require("@/packages/static/images/empty.png")
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
  .img {
    svg {
      width: 350px;
      height: 250px;
    }
  }
  p {
    position: relative;
    bottom: 50px;
    color: #999;
    margin-top: 50px;
  }
}
</style>
