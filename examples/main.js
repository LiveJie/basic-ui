/*eslint-disable */
import Vue from 'vue'
// 导入组件库
// import BasicUI from './../packages'
// import BasicUI from 'basic-vue-ui/lib/basic-vue-ui.umd.min'
import BasicPage from '../lib/components/page'
console.log(BasicPage, "BasicPage")
// import "basic-vue-ui/lib/basic-vue-ui.css"
// import BasicUI from '../lib/basic-vue-ui.umd.min'
import "../lib/basic-vue-ui.css"
import App from './App.vue'

Vue.use(BasicPage)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
