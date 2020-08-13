//仓库管理存储的数据
const state = {
	buycar: []
}

//接收组件发送过来的请求
const actions = {
	//additem是组件发送过来的请求名字 所以在这里以同样的名字接收，
	addItem: ({
		commit,
		state
	}, payload) => {
		//浅拷贝一下在state里定义好的数组 因为不能操作元数组 否则会数据不响应式
		let arr = [...state.buycar];
		let find = false; //这个是用于判断商品是否存在，默认是不存在
		//这里对定义好的数组进行遍历，如果其中的某一项的_id跟传过来的_id相同，表示这个商品存在那我就直接让我存放在数组的num加一
		//并且改变find的值为wrue
		state.buycar.forEach((item, index) => {
			if (item._id == payload._id) {
				find = true;
				item.num++
			}
		})
		if (!find) {
			//这里 如果 find 是ture 取反 就是false 表示不通过就不会执行了
			//这里 如果 find 是false 取反 就是ture 表示通过就会执行了
			//为false 表示没有这个商品 就把它整个添加进去
			payload.num = 1;
			arr.push(payload)
		}
		//将处理好的这个arr 发送给mutation
		commit('ADD_ITEM', arr)
	},
	//整个表示组件发送来的删除请求 我在这里进行业务处理，
	del:({commit,state},payload)=>{
		//遍历一下state.buycar这个数组
		state.buycar.forEach((item,index)=>{
			//如果当前的这个id等于我传递过来的id  那我就删除这个数组
			if(item._id==payload._id){
				//使用数组的删除方法 splice 
				state.buycar.splice(index,1)
			}
		})
		//将这个处理好的数组发送给 mutation
		commit('DEL',[...state.buycar])
	}
}
//接收actions发送过来的请求
const mutations = {
	//接受actions发送过来的这个数组  因为我只进行 数据的赋值 所以直接给state.buycar进行赋值
	ADD_ITEM: (state, payload) => {
		state.buycar = payload
	},
	DEL:(state,payload)=>{
		state.buycar=payload
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
