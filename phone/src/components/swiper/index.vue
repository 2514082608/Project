<template>
	<div class="swiper-container" id="bannerBox">
		<!-- 承载图片的盒子, 就是我们的 ul.imgBox -->
		<div class="swiper-wrapper">
			<!-- 这里一个 div 就是一个 图片位置 -->
			<div v-for="(item,index) of data" :key="index" class="swiper-slide"><img :src="item.src" alt=""></div>

		</div>

		<!-- 如果需要分页器 -->
		<!-- <div class="swiper-pagination"></div> -->

		<!-- 如果需要导航按钮 -->
		<div v-if="bl" class="swiper-button-prev"></div>
		<div v-if="bl" class="swiper-button-next"></div>

	</div>
</template>

<script>
	import Swiper from 'swiper'
	require('./css/swiper.css')
	export default {
		name: 'index',
		props: {
			data:{
				type:Array,
				default:[]
			},
			bl: {
				default: true
			}
		},
		mounted() {
			var mySwiper = new Swiper('.swiper-container', {
				loop: true,
				autoplay: 5000,
				pagination: '.swiper-pagination',
				autoplayDisableOnInteraction: false,
				// 下一张使用哪一个元素
				prevButton: '.swiper-button-next',
				// 上一张使用哪一个元素
				nextButton: '.swiper-button-prev',

			});
			// console.log(mySwiper.params.autoplay)
		}
	}
</script>

<style scoped>
	/* @import './css/swiper.css'; */

	.swiper-container {
		margin-top: 0;
		width: 100%;
		height: 250px;
	}

	.swiper-container img {
		width: 100%;
		height: 100%;
	}
</style>
