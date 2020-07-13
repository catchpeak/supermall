<template>
	<div class="wrapper" ref='wrapper'>
		<div class="content">
			<slot></slot>
		</div>	 
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	export default {
		name: 'scroll',
		data(){
			return {
				scroll: null
			}
		},
		props: {
			probeType: {
				type: Number,
				default: 0
			},
			pullUpLoad: {
				type: Boolean,
				default: false
			}
		},
		mounted(){
			//1创建
			this.scroll = new BScroll(this.$refs.wrapper,{
				click:true,
				probeType: this.probeType,
				pullUpLoad: this.pullUpLoad
			})		
			
			//2监听
			if(this.probeType === 2 || this.probeType === 3){
				this.scroll.on('scroll', position => { 
					this.$emit('scroll',position)
					//console.log(position)
				})
			}
			
			if(this.pullUpLoad){
				this.scroll.on('pullingUp', () => {
					this.$emit('pullingUp')
					//console.log('上拉加载')
				})
			}
			
			
			
			//监听上拉加载
		},
		methods: {
			scrollTo(x,y,time=500){
				this.scroll && this.scroll.scrollTo(x,y,time)
			},
			finishpullup(){
				this.scroll.finishPullUp()
			},
			refresh(){
				this.scroll && this.scroll.refresh()
			}
		}
	}
</script>

<style>
</style>