<template>
	<div class="Home">
		<Header />
		<Swiper :data="data"></Swiper>
		<p class="viewAll">Product Category</p>
		<div class="nav">
			<Block :btn_block="btn_block"/>
		</div>
		<p class="viewAll"><span>Flash Sale</span> <button>View All</button> </p>
		<Swiper :bl="bl" :data="data"></Swiper>
		<p class="viewAll"><span>Flash Sale</span> <button>View All</button> </p>
		<ShopBlock @click="add" v-for="(item,index) of $store.state.home.homeData" :key="item._id" :list="item"></ShopBlock>
		
		<Footer />
	</div>
</template>

<script>
	import Header from '../components/Header.vue'
	import Footer from '../components/footer.vue'
	import Block from '../components/block.vue'
	import Swiper from '../components/swiper/index.vue'
	import ShopBlock from '../components/shop_block.vue'
	export default{
		name:'Home',
		components:{
			Block,Footer,Header,Swiper,ShopBlock
		},
		data(){
			return{
				text:'Womens',
				text2:'',
				bl:false,
				data:[
					{src:'/img/2020-02-08 201452.jpg'},
					{src:'/img/2020-02-08 201452.jpg'},
					{src:'/img/2020-02-08 201452.jpg'},
				],
				btn_block:[
					{txt:'womens'},
					{txt:'womens'},
					{txt:'womens'},
					{txt:'womens'},
					{txt:'womens'},
					{txt:'womens'},
				]
			}
		},
		//组件挂载的时候我就利用状态管理发送一个action请求
		mounted() {
			//dispatch 发送到action 
			this.$store.dispatch('home/'+this.$types.home)
		},
		methods:{
			add(list){
				this.$store.dispatch('shopcar/addItem',list)
			}
		},
		beforeCreate() {
			let token = window.localStorage.getItem('user')
			if (!token) {
				console.log('空')
				this.$router.replace('/login')
			}
		},
	}
</script>

<style scoped>
	.Home{
		width: 100%;
	}
	.nav{
		width: 100%;
		height: 250px;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		align-items: center;
	}
	.viewAll{
		width: 100%;
		height: 60px;
		display: flex;
		margin-left: 10px;
		/* border: 1px solid black; */
		justify-content: space-between;
		align-items: center;
	}
	.viewAll span{
		width: 80px;
		height: 30px;
	}
	.viewAll button{
		width: 80px;
		margin-right: 20px;
		height: 30px;
	}
</style>
