import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
import router from './plugin/router.js'
import './assets/style/style.css'

import store from './plugin/vuex.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import * as types from './store/types.js';
Vue.prototype.$types=types;//为了在组件内部使用types类型，无需处处导入


new Vue({
	render: h => h(App),
	router,
	store
}).$mount('#app')
