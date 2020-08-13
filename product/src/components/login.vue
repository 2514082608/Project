<template>
	<div class="Login">

		<el-form id="login-inp"  status-icon  label-width="100px" class="demo-ruleForm">
			<el-form-item label="账号" >
				<el-input type="text" v-model="account"></el-input>
			</el-form-item>
			<el-form-item label="密码" >
				<el-input type="password" v-model="Pass" ></el-input>
			</el-form-item>
			{{error}}
			<el-form-item>
				<el-button type="primary" @click="submitForm">提交</el-button>
				<router-link class="reg_btn" to="/reg">
					<el-button>注册</el-button>
				</router-link>
			</el-form-item>

		</el-form>

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
						window.localStorage.setItem('user',JSON.stringify(res.data))
						this.$router.replace('/home')
						
					}
				).catch(
					err =>  this.error=err
				)

			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		}
	}
</script>

<style scoped>
	.Login {
		width: 100%;
		height: 100%;
		background: url(https://file.iviewui.com/admin-dist/img/login-bg.0899ffa6.jpg) no-repeat;
		background-size: 100% 100%;
		position: relative;
	}

	#login-inp {
		position: absolute;
		top: 50%;
		left: 50%;
		margin-left: -250px;
		margin-top: -200px;
		width: 500px;
		height: 400px;
	}

	.reg_btn {
		margin-left: 15px;
	}
</style>
