// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

var t=e=>{console.log(e)}

KEEP("dev",e=>{
  console.log("xxxx")
  alert("")
})

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
