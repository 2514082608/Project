<template>
	<div class="box">
		<div v-for="(item,index) of btn_block" :key="index" class="wrap">
			<span></span>
			<p>{{item.txt}}</p>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'btn_block',
		props: {
			btn_block: {
				type:Array,
				default:[]
			}
		}
	}
</script>

<style scoped>
	.box {
		width: 100%;
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
	}

	.wrap {
		width: 106px;
		height: 106px;
		border-radius: 15px;
		background: rgb(255, 255, 255);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background: white;
	}

	.wrap span {
		width: 20px;
		height: 20px;
		background-color: #0B2E13;
	}
</style>
