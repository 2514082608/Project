<template>
	<div class="Login">

			账号：<input type="text" v-model="account"></input> <br>
			密码：<input type="password" v-model="Pass" ></input> <br>
			{{error}} <br>
				<button type="primary" @click="submitForm">提交</button>
				<router-link class="reg_btn" to="/reg">
					<button>注册</button>
				</router-link>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		name: 'Login',
		data() {
			return {
					account: '',
					Pass: '',
					error:''
			}
		},
		methods: {
			submitForm() {
				if(!this.account || !this.Pass){
					alert('请输入账号密码')
					return
				}
				axios({
					url: '/api/login',
					params: {
						name: this.account,
						age: this.Pass,
					}
				}).then(
					res => {
						console.log(res)
						if(res.data.err==1){
							return alert('账号密码错误')
						}
						window.localStorage.setItem('user',JSON.stringify(res.data))
						this.$router.replace('/home')
						
					}
				).catch(
					err =>  this.error=err
				)

			},
		}
	}
</script>

<style scoped>
	.Login{
		width: 100%;
		height: 300px;
	}
	.Login input{
		width: 300px;
		height: 20px;
		border: 1px salmon solid;
	}
</style>
