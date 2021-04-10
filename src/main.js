import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vue from 'vue'
import store from './store'

import toast from 'components/common/toast'

import FastClick from 'fastclick';
import VueLazyload from "vue-lazyload";

Vue.config.productionTip = false;

Vue.prototype.$bus = new Vue();   //事件总线

//安装toast插件
Vue.use(toast);

//解决移动端三百毫秒的延迟
FastClick.attach(document.body);

//使用懒加载的插件(需要将使用懒加载的图片路径改为src->v-lazy)
Vue.use(VueLazyload, {
  loading: require('assets/img/common/placeholder.png') 
});

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
