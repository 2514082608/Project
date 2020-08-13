<template>
	<table class="wrap">
		<tr>
			<td>name：</td>
			<td>
				<input type="text" v-model="name">
			</td>
		</tr>
		<tr>
			<td>age：</td>
			<td>
				<input type="text" v-model="age">
			</td>
		</tr>
		<tr>
			<td>address：</td>
			<td>
				<input type="text" v-model="address">
			</td>
		</tr>
		<tr>
			<td>icon：</td>
			<td>
				<input type="file" id="icon" style="width: 100px;height: 21px;border: none;">
			</td>
		</tr>
		<tr>
			<td><button @click="add">添加</button></td>
			<td><button @click="reset">重置</button></td>
		</tr>
	</table>

</template>

<script>
	import axios from 'axios'
	export default {
		name: "Reg",
		data() {
			return {
				name: '',
				age: '',
				address: '',
				icon: ''
			}
		},
		methods: {
			add() {
			
				if(this.name=='undefined' || this.age=='undefined'){
						return
				}
				//1.注册需要向数据库里添加一条数据 这条数据包涵，name  age  address  icon  
				//2.就是当我点击的时候需要发送一个请求 接口为 /api/reg  
				//3.数据请求成功后我需要跳转到login 登陆页 
				let formData = new FormData();
				formData.append('name', this.name);
				formData.append('age', this.age);
				formData.append('address', this.address);

				let iconInputFile = document.getElementById('icon');
				formData.append('icon', iconInputFile.files[0]); //取出input file的文件体

				axios({
					url: '/api/reg',
					data: formData,
					method: 'POST'
				}).then(
					res => {
						console.log(res)
						alert('添加成功')
						this.$router.replace('/home')
					}
				).catch(
					err => console.log(err)
				)

			},
			reset() {
				alert('reset')
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
