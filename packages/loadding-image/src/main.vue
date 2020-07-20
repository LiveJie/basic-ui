<template>
  <div class="img-module">
    <img src="http://oss.humorjie.vip/loadding.jpg" :alt="alt" v-show="!imgStatus"  align="align">
    <img :src="src" :alt="alt" v-show="imgStatus" @load="loadImage"  align="align">
  </div>
</template>
<script>
export default {
    name: "BasicLoaddingImage",
    model: {
        prop: 'value',
        event: 'changeValue'
    },
    props: {
        src: {
            type: [Object, String],
            default: null
        },
        alt: {
            type: String,
            default: null
        },
        align: {
            type: String,
            default: null
        }
    },
    data () {
        return {
            imgStatus: false,
        }
    },
    watch: {
    },
    methods: {
        loadImage() {
            this.imgStatus = true
        }
    },
    mounted () {
    }
}
</script>
<style lang="scss">
.img-module {
  width: 100%;
  height: 100%;
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>
