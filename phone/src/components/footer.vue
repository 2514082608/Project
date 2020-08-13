<template>
	<div class="wrap">
		<router-link to="/home" class="li">
			<span class="el-icon-house"></span>
			<span>home</span>
		</router-link>
		<router-link to="/square" class="li">
			<span class="el-icon-chat-dot-square"></span>
			<span>support</span>
		</router-link>
		<router-link to="/cart" class="li">
			<span class="el-icon-shopping-cart-2"></span>
			<span>cart</span>
		</router-link>
		<router-link to="/Pages" class="li">
			<span class="el-icon-files"></span>
			<span>pages</span>
		</router-link>

		<router-link class="li" to='/setting'>
			<span class="el-icon-setting"></span>
			<span>Settings</span>
		</router-link>

	</div>
</template>

<script>
	export default{
		name:'setting',
		
	}
</script>

<style scoped>
	.wrap {
		width: 100%;
		height: 60px;
		position: fixed;
		bottom: 0;
		left: 0;
		/* background: #0C153B; */
		display: flex;
		justify-content: space-around;
		align-items: center;
		background-color: white;
		z-index: 9999;
	}

	.li {
		width: 60px;
		display: flex;
		align-items: center;
		flex-direction: column;
	}
	.li span{
	
	}
</style>
