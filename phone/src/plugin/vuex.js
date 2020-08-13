import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex)

import home from '../store/moudel/home.js'
import shopcar from '../store/moudel/shopcar.js'

let store = new Vuex.Store({
  modules:{
    // 模块名:模块变量名
    home,shopcar
  }
});

export default store;
