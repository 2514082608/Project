<template>
	<div class="wrap">
		<div v-for="(item,index) of cellDate" :key="index" class="cell">
			<div class="left">
				<span class="icon" v-if="show">{{item.icon_txt}}</span>
				<span>{{item.txt}}</span>
			</div>
			<p :style="{color:item.bgcolor}" class="extend">
				&gt;
			</p>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'cell',
		props: {
			show: {
				default: true
			},
			cellDate: {
				type: Array,
				default: []
			},

		}
	}
</script>

<style scoped>
	.wrap {
		width: 100%;
		padding-left: 10px;
		padding-right: 10px;
		box-sizing: border-box;
	}

	.cell {
		width: 100%;
		height: 50px;
		box-sizing: border-box;
		padding: 15px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: white;
		border-radius: 10px;
		margin-top: 10px;
	}

	.icon {
		width: 25px;
		height: 25px;
		display: inline-block;
		text-align: center;
		line-height: 25px;
		margin-right: 15px;
		background-color: rgb(138, 72, 33);
	}

	.cell:active {
		opacity: 0.8;
	}

	.extend {
		font-size: 18px;
	}
</style>
