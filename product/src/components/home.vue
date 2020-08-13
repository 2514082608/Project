<template>
	<div class="Home">
		<el-container style="height: 100%;">
			<el-aside width="200px">

				<el-row class="tac nav">
					<el-col :span="24">
						<el-menu default-active="2" class="el-menu-vertical-demo">
							<el-menu-item index="1">
								<img src="/img/timg.jpg" alt="">
							</el-menu-item>
							<el-menu-item index="2" @click="show">
								<template slot="title">
									<i class="el-icon-user"></i>
									<span>用户数据</span>
								</template>

							</el-menu-item>
							<el-menu-item index="3" @click="show2">
								<i class="el-icon-menu"></i>
								<span slot="title">数据管理</span>
							</el-menu-item>
							<el-menu-item index="4">
								<i class="el-icon-document"></i>
								<span slot="title">导航三</span>
							</el-menu-item>
							<el-menu-item index="5">
								<i class="el-icon-setting"></i>
								<router-link to="/login">{{cpt}}</router-link>
							</el-menu-item>
							<el-menu-item index="6">
								<span @click="remove">注销</span>
							</el-menu-item>
						</el-menu>
					</el-col>
				</el-row>


			</el-aside>
			<el-container>
				<el-header>

				</el-header>
				<el-main>
					<!-- keep-alive 包裹着的组件可以把其中的内容数据缓存起来 -->
					<template v-if="bl">
						<router-link to="/inster">
							<Headefun class="add" :text="text"></Headefun>
						</router-link>
						<keep-alive>

							<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
								<el-table-column type="selection" width="55">
								</el-table-column>
								<el-table-column label="ID" width="150">
									<template slot-scope="scope">{{ scope.row._id }}</template>
								</el-table-column>
								<el-table-column label="价格" width="150">
									<template slot-scope="scope">{{ scope.row.marketPrice }}</template>
								</el-table-column>
								<el-table-column label="折扣" width="120">
									<template slot-scope="scope">{{ scope.row.saleDiscount }}</template>
								</el-table-column>
								<el-table-column label="Title" how-overflow-tooltip>
									<template slot-scope="scope">{{ scope.row.title }}</template>
								</el-table-column>
								<el-table-column label="操作">
									<router-link slot-scope="scope" :to="{name:'delate',query:{collectionName:'shopList',_id:showID(scope.row)}}"><button>删除</button></router-link>
								</el-table-column>
							</el-table>

						</keep-alive>
					</template>


					<template v-else>
						<router-link to="/userInster">
							<Headefun class="add" :text="text"></Headefun>
						</router-link>
						<keep-alive>
							<el-table ref="multipleTable" :data="user" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
								<el-table-column type="selection" width="55">
								</el-table-column>
								<el-table-column label="ID" width="150">
									<template slot-scope="scope">{{ scope.row._id }}</template>
								</el-table-column>
								<el-table-column label="名字" width="150">
									<template slot-scope="scope">{{ scope.row.name }}</template>
								</el-table-column>
								<el-table-column label="年龄/密码" width="150">
									<template slot-scope="scope">{{ scope.row.age }}</template>
								</el-table-column>
								<el-table-column label="地址" how-overflow-tooltip>
									<template slot-scope="scope">{{ scope.row.address }}</template>
								</el-table-column>
								<el-table-column label="操作">
									<router-link slot-scope="scope" :to="{name:'userDelate',query:{collectionName:'user',_id:showID(scope.row)}}"><button>删除</button></router-link>
								</el-table-column>
							</el-table>

						</keep-alive>
					</template>

				</el-main>

				<el-footer>
					<!-- 分页 -->
					<div class="btn-wrap" v-if="bl">
						<button @click='btns($event.target.value)' value='1'>1</button>
						<button @click='btns($event.target.value)' value='2'>2</button>
						<button @click='btns($event.target.value)' value='3'>3</button>
						<button @click='btns($event.target.value)' value='4'>4</button>
						<button @click='btns($event.target.value)' value='5'>5</button>
					</div>
					<div class="btn-wrap" v-else>
						<button @click='btns_tow($event.target.value)' value='1'>1</button>
						<button @click='btns_tow($event.target.value)' value='2'>2</button>
						<button @click='btns_tow($event.target.value)' value='3'>3</button>
						<button @click='btns_tow($event.target.value)' value='4'>4</button>
						<button @click='btns_tow($event.target.value)' value='5'>5</button>
					</div>
				</el-footer>

			</el-container>
		</el-container>
	</div>
</template>

<script>
	import axios from 'axios'
	import Headefun from '../element/heade_fun.vue'
	export default {
		name: 'Home',
		components: {
			Headefun
		},
		methods: {
			show() {
				this.bl = true
			},
			show2() {
				this.bl = false
			},
			toggleSelection(rows) {
				if (rows) {
					rows.forEach(row => {
						this.$refs.multipleTable.toggleRowSelection(row);
					});
				} else {
					this.$refs.multipleTable.clearSelection();
				}
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			remove() {
				window.localStorage.removeItem('user')
				this.$router.replace('/login')
			},
			btns(aa) {
				let token = JSON.parse(window.localStorage.getItem('user')).token
				axios({
					url: `/api/goods/shopList`,
					params: {
						_page: aa - 1,
						_limit: 10,
						token: `${token}`
					}
				}).then(
					res => {
						this.tableData = res.data.data
					}
				)
			},
			btns_tow(cc){
				let token = JSON.parse(window.localStorage.getItem('user')).token
				axios({
					url: `/api/user/user`,
					params: {
						_page: cc - 1,
						_limit: 10,
						token: `${token}`
					}
				}).then(
					res => {
						this.user = res.data.data
					}
				)
			},
			showID(ss) {
				return ss._id
			}
		},
		data() {
			return {
				bl: true,
				tableData: [],
				multipleSelection: [],
				user: [],
				andmin: '登陆',
				page: 0,
				text: '增加',
				page2:0
			}
		},

		mounted() {
			let token = JSON.parse(window.localStorage.getItem('user')).token
			axios({
				url: `/api/goods/shopList`,
				params: {
					_page: this.page,
					_limit: 10,
					token: `${token}`
				}
			}).then(
				res => {
					this.tableData = res.data.data
				}
			)

			axios({
				url: '/api/users/user',
				params: {
					page2:this.page2,
					_limit: 10,
					token: `${token}`
				}
			}).then(
				res => {
					this.user = res.data.data
				}
			)
		},
		computed: {
			cpt() {
				if (window.localStorage.getItem('user')) {
					let name = window.localStorage.getItem('user')
					return JSON.parse(name).data.name + '管理员'
				} else {
					return this.andmin
				}
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.nav {
		width: 200px;
		overflow: hidden;
	}

	.add {
		margin-top: 0px;
		margin-bottom: 9px;
	}

	.nav img {
		width: 200px;
		height: 60px;
		margin-left: -10px;
	}

	.el-header,
	.el-footer {
		background-color: #B3C0D1;
		color: #333;
		text-align: center;
		line-height: 60px;
		font-weight: bolder;
		font-size: 20px;
	}

	.el-aside {
		background-color: #D3DCE6;
		color: #333;
		text-align: center;
		line-height: 200px;
	}

	.hello {
		height: 100%;
	}

	.el-main {
		background-color: #E9EEF3;
		color: #333;
		text-align: center;
		padding: 0;
	}

	body>.el-container {
		margin-bottom: 40px;
	}

	.btn-wrap {
		width: 200px;
		height: 30px;
		background: #B3C0D1;
		border: none;
		outline: none;
	}
</style>
