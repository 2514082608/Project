<template>
		<div class="shopBlock" >
			<p style="display: flex;justify-content: space-between;margin-bottom: 5px;">
				<span style="background:red">{{list.saleDiscount}}</span>
				<span>♥</span>
			</p>
			<img :src="list.smallImage" style="margin-left: 20px;" alt=""><br>
			<span >{{list.title}}</span><br>
			<span style="margin-right: 15px;">{{list.salePrice}}</span><del>{{list.marketPrice}}</del><br>
			<p style="display: flex;justify-content: space-between;margin-top: 5px;"><span>★★★★★</span> <button @click="$emit('click',list)">＋</button></p>
		</div>
</template>

<script>
	export default {
		name: "shopBlock",
		props: {
			list: {
			}
		},
		methods:{
				
		}
	}
</script>

<style scoped>

	.shopBlock {
		width: 160px;
		height: 238px;
		padding: 7px;
		border-radius: 10px;
		background-color: white;
		margin-top: 5px;
		margin-bottom: 5px;
		float: left;
		margin-left: 10px;
	}
	.shopBlock img{
		width: 127px;
		height: 127px;
	}
</style>
