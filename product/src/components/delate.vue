<template>
	
		<table class="wrap">
			<tr>
				<td>productId:</td>
				<td><input disabled type="text" v-model="detail.productId" placeholder="产品ID"></td>
			</tr>
			<tr>
				<td>smallImage:</td>
				<td><input disabled type="text" v-model="detail.smallImage" placeholder="请填写一张图片的网址"></td>
			</tr>
			<tr>
				<td>salePrice:</td>
				<td><input disabled type="text" v-model="detail.salePrice" placeholder="折扣后的价格"></td>
			</tr>
			<tr>
				<td>marketPrice:</td>
				<td><input disabled type="text" v-model="detail.marketPrice" placeholder="折扣前的价格"></td>
			</tr>
			<tr>
				<td>saleDiscount:</td>
				<td><input disabled type="text" v-model="detail.saleDiscount" placeholder="折扣"></td>
			</tr>
			<tr>
				<td>title:</td>
				<td><input disabled type="text" v-model="detail.title" placeholder="产品标题"></td>
			</tr>
			<tr>
				<button @click="delDate">确认删除</button>
			</tr>
		</table>


	
</template>

<script>
	import axios from 'axios'
	export default {
		name: 'Delate',
		data() {
			return {
				detail:{}
			}
		},
		mounted() {
			let token = JSON.parse(window.localStorage.getItem('user')).token
			let collectionName = this.$route.query.collectionName
			let _id = this.$route.query._id
			axios({
					url: `/api/goods/${collectionName}/${_id}`,
					params:{
						token:`${token}`
					}
				})
				.then(
					res => {
						console.log(res)
						this.detail = res.data.data
					}
				).catch(
					res => console.log(res)
				)
				
		},
		methods:{
			delDate(){
				let token = JSON.parse(window.localStorage.getItem('user')).token
				axios({
					url:'/api/del',
					method:'POST',
					data:{
						_id:this.$route.query._id,
						token:`${token}`,
					}
				})
				.then(
					res=>{
						console.log(res)
						alert('删除成功')
						this.$router.replace('/home')
					}
				)
			}
		}
	}
</script>

<style scoped>
	.wrap {
		padding-top: 20px;
		width: 400px;
		height: 300px;
		background-color: aliceblue;
		margin-left: 20px;
		border: 1px solid black;
	}

	.wrap input {
		width: 300px;
		height: 30px;
		border: 1px solid #666666;
	}

	.wrap tr td:nth-child(1) {
		width: 50px;
		text-align: center;
	}
</style>
