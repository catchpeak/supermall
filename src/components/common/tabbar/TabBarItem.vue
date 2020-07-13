<template>
	<div class="tab-bar-item" @click="itemclick">
		<div v-if='!isActive'><slot name='item-icon'></slot></div>
		<div v-else><slot name='item-icon-active'></slot></div>
		<div :style='activestyle'><slot  name='item-text'></slot></div>
		
	</div>
	
</template>

<script>
export default {
	name:'TabBarItem',
	props: {
		path: String,
		activeColor: {
			type: String,
			default: 'red'
		}
	},
	data(){
		return {
			//isActive: false
			//prepath: '/home'
		}
	},
	computed: {
		isActive(){
			//console.log(this.$route.path.indexOf(this.path))
			return this.$route.path.indexOf(this.path) !== -1
		},
		activestyle(){
			return this.isActive ? {color: this.activeColor}:{}
		}
	},
	methods: {
		itemclick(){
			if( this.path != this.$route.path){
				this.$router.replace(this.path)				
			}
			console.log('itemclick')
		}
	}
}
</script>

<style scoped>
	.tab-bar-item{
		flex: 1;
		text-align: center;
		height: 49px;
		font-size: 14px;
	}
	.tab-bar-item img{
		width: 24px;
		margin-top: 3px;
		vertical-align: middle;
		margin-bottom: 2px;
	}
	/*.active{
		color: red;
	}*/

</style>