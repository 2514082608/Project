<template>
	<div class="wrap">
		<router-link to="/login">
			<div class="user_icon">
				<span class="el-icon-user"></span>
			</div>
		</router-link>
		<div class="search">
			<span class="el-icon-search"></span>
			<input type="text">
		</div>
		<div class="list">
			<span class="el-icon-s-unfold"></span>
		</div>
	</div>

</template>

<script>
	export default {
		name: 'Header',
		props: {
			
		}
	}
</script>
<style scoped>
	.wrap {
		width: 100%;
		height: 50px;
		background: white;
		overflow: hidden;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: fixed;
		z-index: 999;
		top: 0;
		left: 0;
	}

	.user_icon {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		text-align: center;
		line-height: 40px;
		font-size: 20px;
		margin-left: 10px;
	}
	.search{
		width: 150px;
		height: 40px;
		display: flex;
		position: relative;
		align-items: center;
	}
	.search input{
		height: 30px;
		border: 1px solid #000000;
		margin-top:;
		box-sizing: border-box;
		padding-left: 20px;
	}
	.search span{
		width: 15px;
		height: 15px;
		position: absolute;
		left: 10px;
	}
	.list {
		width: 30px;
		margin-right: 10px;
		height: 40px;
		text-align: center;
		line-height: 40px;
		font-size: 20px;
	}
	
</style>
