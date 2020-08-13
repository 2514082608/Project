<template>
	<div class="wrap">
		<Header></Header>
		<Cell :cellDate="cellDate" ></Cell>
		<Footer></Footer>
	</div>
</template>

<script>
	import Header from '../components/Header.vue'
	import Footer from '../components/footer.vue'
	import Cell from '../components/cell.vue'
	export default {
		name: 'setting',
		components:{
			Header,Footer,Cell
		},
		data(){
			return{
				cellDate:[
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

</style>
