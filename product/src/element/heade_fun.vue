<template>
	<div class="wrap">
		<div >{{text}}</div>
	</div>
</template>

<script>
	export default{
		name:'Headfun',
		props:{
			text:{
				default:'按钮'
			}
		}
	}
</script>

<style scoped>
	.wrap{
		width: 100px;
		height: 50px;
	}
	.wrap div{
		width: 100%;
		height: 100%;
		background: white;
		border-radius: 10px;
		border: 1px solid black;
		line-height: 50px;
		cursor: pointer;
	}
	.wrap div:active{
		opacity: 0.5;
	}
</style>
