// src/plugins/router.js
import Vue from 'vue'

//1. 引入路由包
import VueRouter from 'vue-router'

//2. 安装插件包到Vue上, 
Vue.use(VueRouter);

import Home from '../page/home.vue'
import Setting from '../page/setting.vue'
import Pages from '../page/Pages.vue'
import Cart from '../page/cart.vue'
import Login from '../page/login.vue'
import Reg from '../page/reg.vue'
//3. 路由配置
let routes = [
  {path: '/home',component: Home}, //route  一条路由的配置
  {path: '/setting',component: Setting}, //route  一条路由的配置
  {path: '/Pages',component: Pages}, //route  一条路由的配置
  {path: '/cart',component: Cart}, //route  一条路由的配置
  {path: '/reg',component: Reg}, //route  一条路由的配置
  {path: '/login',component: Login}, //route  一条路由的配置
  {path: '/',redirect:'/home'}, //route  一条路由的配置
]

//4.路由实例
let router = new VueRouter({ //插件路由对象
  // routes:routes
  routes,
});




//5.导出路由实例，让他去控制vue根
export default router