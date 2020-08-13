<template>
	<div class="wrap">
		<router-link to="/login">
			<div class="user_icon">
			
			</div>
		</router-link>
		<div class="search">
			<span></span>
			<input type="text">
		</div>
		<div class="list">

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
		background: #004085;
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
		background: yellow;
		border-radius: 50%;
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
	}
	.search span{
		width: 15px;
		height: 15px;
		position: absolute;
		left: 10px;
		background: #00B894;
	}
	.list {
		width: 30px;
		margin-right: 10px;
		height: 40px;
		background-color: blueviolet;
	}
	
</style>
