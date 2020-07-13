<template>
	<swiper>
	  	<swiper-item v-for='item in banners' interval=1000 >
	  		<a :href="item.link">
	  			<img :src="item.image" @load='imageload'/>
	  		</a>
	  	</swiper-item>
	</swiper>
</template>

<script>
	import {Swiper,SwiperItem} from 'components/common/swiper'
	export default {
		name: 'HomeSwiper',
		props: {
			banners: {
				type: Array,
				default(){
					return []
				}
			}
		},
		data(){
			return {
				isload: false
			}
		},
		components: {
			Swiper,
			SwiperItem
		},
		methods: {
			imageload(){
				if(!this.isload){
					this.$emit('swiperimgload')
					this.isload = true
				}
				
			}
		}
	}
</script>

<style scoped>
</style>