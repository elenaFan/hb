import Vue from 'vue'
import App from './App.vue'
import detail from './components/detail.vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false;

import VueRouter from 'vue-router';
import index from './components/index.vue';

import axios from "axios";
Vue.prototype.$axios = axios;
axios.defaults.baseURL='http://111.230.232.110:8899';

Vue.use(VueRouter);
const routes=[
  {
    path:'/',
    component:index
  },
  {
    path:'/index',
    component:index
  },{
    path:'/detail/:goodID',
    component:detail
  }
]
const router=new VueRouter({
  routes
})


import ProductZoomer from 'vue-product-zoomer'
Vue.use(ProductZoomer)

import moment from "moment";


import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);


Vue.filter('beautifyTime', function(value) {
  return moment(value).format("YYYY年MM月DD日");
})
Vue.filter('beautyTime', function(value) {
  return moment(value).format("YYYY年MM月DD日");
})


new Vue({
  render: h => h(App),
  router
}).$mount('#app')
