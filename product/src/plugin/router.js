// src/plugins/router.js
import Vue from 'vue'

//1. 引入路由包
import VueRouter from 'vue-router'

//2. 安装插件包到Vue上, 
Vue.use(VueRouter);


import Login from '../components/login.vue'
import Home from '../components/home.vue'
import Reg from '../components/reg.vue'
import Inster from '../components/inster.vue'
import userInster from '../components/userInster.vue'
import Delate from '../components/delate.vue'
import userDelate from '../components/userDelate.vue'
//3. 路由配置
let routes = [{
		path: '/home',
		component: Home
	},
	{
		path: '/login',
		component: Login
	},
	{
		path: '/reg',
		component: Reg
	},
	{
		path: '/inster',
		component: Inster
	},
	{
		path: '/userInster',
		component: userInster
	},
	{
		path: '/userDelate',
		component: userDelate,
		name:'userDelate'
	},
	{
		path: '/delate',
		component: Delate,
		name:'delate'
	},
	{
		path: '/',
		redirect: '/home'
	},

]



//4.路由实例
let router = new VueRouter({ //插件路由对象
	// routes:routes
	routes,
});

// router.beforeEach((to, from, next) => {

// 	//	to: 目标路由
// 	//	from: 当前路由

// 	// next() 跳转  一定要调用
// 	// 守卫业务
// 	if (to.path == '/login' || to.path == '/reg'  ) {
// 		//判断是不是登录了
// 		//axios请求 携带 token 
// 		next()
// 	} else {
// 		let token = window.localStorage.getItem('user')
// 		if (!token) {
// 			console.log('空')
// 			next('/login');
// 		}

// 	}

// })


//5.导出路由实例，让他去控制vue根
export default router
