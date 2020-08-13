<template>
	<table class="wrap">
		<tr>
			<td>productId:</td>
			<td><input type="text" v-model="productId" placeholder="产品ID"></td>
		</tr>
		<tr>
			<td>smallImage:</td>
			<td><input type="text" v-model="smallImage" placeholder="请填写一张图片的网址"></td>
		</tr>
		<tr>
			<td>salePrice:</td>
			<td><input type="text" v-model="salePrice" placeholder="折扣后的价格"></td>
		</tr>
		<tr>
			<td>marketPrice:</td>
			<td><input type="text" v-model="marketPrice" placeholder="折扣前的价格"></td>
		</tr>
		<tr>
			<td>saleDiscount:</td>
			<td><input type="text" v-model="saleDiscount" placeholder="折扣"></td>
		</tr>
		<tr>
			<td>title:</td>
			<td><input type="text" v-model="title" placeholder="产品标题"></td>
		</tr>
		<tr>
			<button @click="addDate">确认添加</button>
		</tr>
	</table>
</template>

<script>
	import axios from 'axios'
	export default{
		name:'Inster',
		data(){
			return {
				productId:'',
				smallImage:'',
				salePrice:'',
				marketPrice:'',
				saleDiscount:'',
				title:''
			}
		},
		methods:{
			addDate(){
				let token = JSON.parse(window.localStorage.getItem('user')).token
				axios({
					url:'/api/inster',
					method:'POST',
					data:{
						productId:this.productId,
						smallImage:this.smallImage,
						salePrice:this.salePrice,
						marketPrice:this.marketPrice,
						saleDiscount:this.saleDiscount,
						title:this.title,
						token:`${token}`
					},
					
				})
				.then(
					res=>{
						console.log(res)
						alert('添加成功')
						this.$router.replace('/home')
					}
					
				)
				.catch(
					err=>console.log(err)
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
