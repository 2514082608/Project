<template>
	<div class="wrap">
		<Header></Header>
		<p ><span>All Pages</span></p>
		<Cell :cellDate="cellDate" :show="show"></Cell>
		<Footer></Footer>
	</div>
</template>

<script>
	import Header from '../components/Header.vue'
	import Footer from '../components/footer.vue'
	import Cell from '../components/cell.vue'
	export default{
		name:'pages',
		props:{
			
		},
		components:{
			Header,Footer,Cell
		},
		data(){
			return{
				show:false,
				cellDate:[
					{icon_txt:'√',txt:'every',bgcolor:'blue'},
					{icon_txt:'√',txt:'every',bgcolor:'blue'},
					{icon_txt:'√',txt:'every',bgcolor:'blue'},
					{icon_txt:'√',txt:'every',bgcolor:'blue'},
					{icon_txt:'√',txt:'every',bgcolor:'blue'},
					{icon_txt:'√',txt:'every',bgcolor:'blue'},
					{icon_txt:'√',txt:'every',bgcolor:'blue'},
					{icon_txt:'√',txt:'every',bgcolor:'blue'},
					{icon_txt:'√',txt:'every',bgcolor:'blue'},
					{icon_txt:'√',txt:'every',bgcolor:'blue'},
					{icon_txt:'√',txt:'every',bgcolor:'blue'},
					{icon_txt:'√',txt:'every',bgcolor:'blue'},
					{icon_txt:'√',txt:'every',bgcolor:'blue'},
					{icon_txt:'√',txt:'every',bgcolor:'blue'},
					{icon_txt:'√',txt:'every',bgcolor:'blue'},
				]
			}
		}
	}
</script>

<style scoped>
	.wrap p{
		width: 100%;height: 50px;
		display: flex;
		align-items: center;
		/* border: 1px solid red; */
		box-sizing: border-box;
		padding-left: 10px;
		line-height: 50px;
		font-size: 20px;
	}
</style>
