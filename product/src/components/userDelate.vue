<template>
	
		<table class="wrap">
			<tr>
				<td>name:</td>
				<td><input disabled type="text" v-model="detail.name" placeholder="名字"></td>
			</tr>
			<tr>
				<td>age:</td>
				<td><input disabled type="text" v-model="detail.age" placeholder="年龄"></td>
			</tr>
			<tr>
				<td>address:</td>
				<td><input disabled type="text" v-model="detail.address" placeholder="地址"></td>
			</tr>
			<tr>
				<td>icon:</td>
				<td><input disabled type="text" v-model="detail.icon" placeholder="头像"></td>
			</tr>
			<tr>
				<td>_id:</td>
				<td><input disabled type="text" v-model="detail._id" placeholder="ID"></td>
			</tr>
			<tr>
				<button @click="delDate">确认删除</button>
			</tr>
		</table>


	
</template>

<script>
	import axios from 'axios'
	export default {
		name: 'userDelate',
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
					url: `/api/user/${collectionName}/${_id}`,
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
					url:'/api/userDel',
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
