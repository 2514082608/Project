import * as types from '../types.js';
import axios from 'axios'

//仓库管理存储的数据
const state = {
	homeData:[]
}

//接收组件发送过来的请求 组件可以通过dispath  或者 mapaction 发送到这里
const actions = {
	//这个type.home 表示是 从 types这个模块里解出来的成员，
	//我这里接收到从组件里传过来的请求后 在这里处理业务
	 [types.home]: ({state,commit},payload)=>{
		 //方法接受两个参数，第一个是store身上的属性方法，state仓库，commit是用于传递给mutations的方法
		 //第二个是负载 就是组件传过来的时候携带的参数
	    axios({
			//这里发送请求 拿到数据
	      url:'/api/goods/shopList',
	      params:{_limit:6,token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjE5OWE0ZDUwMWM4Y2E2MTFkMmZjNTkiLCJpYXQiOjE1OTcyMzIyNTEsImV4cCI6MTU5NzMxODY1MX0.JXT9wee5kBiaHLIJJZ5MrPrEiJNCrxXbcRgNcPSAM_M'}
	    }).then(
	      res=>{
			  console.log(res.data.data)
			  //拿到请求回来的数据后，使用commit方法向mutations发送过去
			  //第一个参数是mutations写好的方法名，第二个是负载 
			  commit(types.home,res.data.data)
		  }
	    )
	  },
}
//接收actions发送过来的请求
const mutations = {
	//这里接收action发送过来的请求 
	//直接对state 里面的成员进行赋值  就是把action带过来的数据付给state的成员
	[types.home]:(state,payload)=>{
		state.homeData=payload
	}
}
//处理一下结果
const getters = {
	
}

export default {
	namespaced: true, //命名空间的模块。模块内部直接调用，外部需要命名空间(见组件)
	state,
	actions,
	mutations,
	getters
}
