<template>
	<div class="wrap">
		<div class="box" v-for="(item,index) of $store.state.shopcar.buycar" :key="index">
			<span class="del" @click="del({_id:item._id})">❌</span>
			<img :src="item.smallImage" alt="">
			<p>
				<span>{{item.salePrice}}</span>
				<br>
				<span>{{item.marketPrice}}</span>
			</p>
			<input type="text" :value="item.num">
		</div>
	</div>
</template>

<script>
	import {createNamespacedHelpers} from 'vuex';
	const {
		mapState,
		mapActions,
		mapMutations
	} = createNamespacedHelpers('shopcar')
	export default {
		
		name: 'cartCell',
		props: {
			value: {},
		},
		data() {
			return {
				data: [{}],

			}
		},
		methods: {
			...mapActions(['del'])
		}
	}
</script>

<style scoped>
	.box {
		width: 100%;
		/* border: 1px solid red; */
		height: 50px;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.del {
		width: 20px;
		height: 50px;
		line-height: 50px;
	}

	.box img {
		width: 40px;
		height: 40px;
	}

	.box input {
		width: 30px;
		height: 20px;
		border: 1px solid grey;
	}
</style>
