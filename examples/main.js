import Vue from 'vue'
// 导入组件库
// import BasicUI from './../packages'
import BasicUI from '../lib/basic-ui.umd.min'
import "../lib/basic-ui.css"
import App from './App.vue'

Vue.use(BasicUI)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
