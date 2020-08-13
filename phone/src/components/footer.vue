<template>
	<div class="wrap">
		<router-link to="/home" class="li">
			<span></span>
			<p>home</p>
		</router-link>
		<div class="li">
			<span></span>
			<p>support</p>
		</div>
		<router-link to="/cart" class="li">
			<span></span>
			<p>cart</p>
		</router-link>
		<router-link to="/Pages" class="li">
			<span></span>
			<p>pages</p>
		</router-link>

		<router-link class="li" to='/setting'>
			<span></span>
			<p>Settings</p>
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
		height: 60px;
		display: flex;
		justify-content: center;
		align-items: center;
		background: olivedrab;
		flex-direction: column;
	}

	.li span {
		width: 15px;
		height: 15px;
		background: #0062CC;
	}
</style>
