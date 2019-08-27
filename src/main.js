// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import 'ant-design-vue/dist/antd.css' //ant组件样式
import './components.js' //ant组件

import './assets/css/base-wx.css'

import './permission'   //重定向
import store from './store'  //vuex

import i18n from '@/lang'

import VueSocketIO from 'vue-socket.io'
Vue.use(new VueSocketIO({
  debug: false,
  connection: 'http://40.114.70.112:2019',
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  }
}))

Vue.config.productionTip = false

//创建和挂载根实例
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  render: h => h(App),
  template: '<App/>'
})
