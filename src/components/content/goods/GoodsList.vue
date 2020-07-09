<template>
	<grid-view>
		<goods-list-item v-for="item in goods"
			:goods-item='item'></goods-list-item>
	</grid-view>
</template>

<script>
  import GridView from 'common/gridView/GridView'
	import GoodsListItem from './GoodsListItem'
	export default {
		name: 'GoodsList',
		components: {
			GoodsListItem,
			GridView
		},
		props: {
			goods: {
				type: Array,
				default(){
					return []
				}
			}
		}
	}
</script>

<style scoped>
/*.goods{
	display: flex;
	设置百分比
	justify -content: space -evenly
}*/
</style>