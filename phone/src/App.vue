<template>
  <div id="app">
  <!--  <Header />
    <Footer />
	<Block /> -->
	<router-view></router-view>
  </div>
</template>

<script>
// import Header from './components/Header.vue'
// import Footer from './components/footer.vue'
// import Block from './components/block.vue'
	
export default {
  name: 'app',
  // components: {
  //   Header,Footer,Block
  // }
}
</script>

<style scoped>
#app{
	padding-top: 50px;
	margin-bottom: 60px;
	width: 100%;
	height: 100%;
	background: rgba(231,234,245);
	overflow-x: hidden;
}

</style>
