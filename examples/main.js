import Vue from 'vue'
// 导入组件库
import BasicUI from './../packages'
import App from './App.vue'

Vue.use(BasicUI)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
