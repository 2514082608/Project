import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.config.productionTip = false

import './assets/css/base.css'
import router from './plugin/router.js'

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
