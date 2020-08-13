<template>
	<div class="wrap">
		<div class="head">
			<span @click="$router.go(-1)">←</span>
			<span class="txt">My Cart</span>
			<i></i>
		</div>
		<div class="cart_list">
			<CartCell ></CartCell>
			<!-- <CartCell ></CartCell> -->
		</div>
		
		<Footer></Footer>
	</div>
</template>

<script>
	import Footer from '../components/footer.vue'
	import CartCell from '../components/cart_cell.vue'
	export default{
		name:'cart',
		props:{
			
		},
		components:{
			Footer,CartCell
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
	.head{
		width: 100%;
		height: 50px;
		display: flex;
		position: fixed;
		box-sizing: border-box;
		top: 0;
		left: 0;
		background: white;
		justify-content: space-around;
		/* border: 1px solid red; */
		
		align-items: center;
	}
	.head span:nth-child(1){
		width: 20px;
		height: 50px;
		line-height: 50px;
		font-size: 40px;
	}
	.txt{
		width: 50px;
		height: 50px;
		line-height: 50px;
	}
	.head i{
		width: 20px;
		height: 20px;
		background: red;
	}
	.cart_list{
		width: 341px;
		height: 253px;
		background: white;
		border-radius: 10px;
		margin: 10px auto;
		
		box-sizing: border-box;
		/* border: 1px solid red; */
	}
</style>
