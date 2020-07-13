<template>
<div id='detail'>
	<detail-nav-bar class='detail-nav-bar'></detail-nav-bar>
	<scroll class='content' ref='scroll'>
		<detail-swiper :top-images='topImages'></detail-swiper>
		<detail-base-info :goods='goods'></detail-base-info>
		<detail-shop-info :shop='shop'></detail-shop-info>
		<detail-goods-info 
			@detailimgload='detailimgload'
			:detail-info='detailInfo'></detail-goods-info>
		<detail-param-info :param-info='paramInfo'></detail-param-info>
		<detail-comment-info :comment-info='commentInfo'></detail-comment-info>
		<goods-list :goods='recommends'></goods-list>
	</scroll>
</div>
</template>

<script>
	import detailNavBar from './childcomps/detailnavbar'
	import detailSwiper from './childcomps/detailswiper'
	import DetailBaseInfo from './childcomps/DetailBaseInfo'
	import DetailShopInfo from './childcomps/DetailShopInfo'
	import DetailGoodsInfo from './childcomps/DetailGoodsInfo'
	import DetailParamInfo from './childcomps/DetailParamInfo'
	import DetailCommentInfo from './childcomps/DetailCommentInfo'
	
	import Scroll from 'components/common/scroll/scroll'
	import GoodsList from 'components/content/goods/GoodsList'
	import {debounce} from 'common/utils/utils.js'
	//数据
	import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail.js'
	import {itemListenertMixin} from 'common/mixin.js'
	
	export default {
		name: 'detail',
		mixins: [itemListenertMixin],
		data(){
			return {
				iid: null,
				topImages: [],
				goods: {},
				shop: {},
				detailInfo: {},
				paramInfo: {},
				commentInfo: {},
				recommends: []
			}
		},
		methods:{
			detailimgload(){
				//console.log(this.$refs.scroll)
				this.$refs.scroll.refresh()
				//console.log('接到了')
			}
		},
		mounted(){
			
		},
		destroyed(){
			//console.log('清除')
			this.$bus.$off('itemImageLoad',this.itemImgListener)
		},
		created(){
			//console.log(this.$route.params)
			//保存传入的iid
			this.iid = this.$route.params.iid
			
			getDetail(this.iid).then(res =>{
				//console.log(res)
				const data = res.data.result
				this.topImages = data.itemInfo.topImages
				this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
				this.shop = new Shop(data.shopInfo)
				this.detailInfo = data.detailInfo
				this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
				if(data.rate.cRate !== 0){
					this.commentInfo = data.rate.list[0]
				}
			getRecommend().then( res =>{
				this.recommends = res.data.data.list
			})
			
			})
		},
		components: {
			detailNavBar,
			detailSwiper,
			DetailBaseInfo,
			DetailShopInfo,
			Scroll,
			DetailGoodsInfo,
			DetailParamInfo,
			DetailCommentInfo,
			GoodsList
		}
	}
</script>

<style scoped>
	#detail{
		position: relative;
		z-index: 21;
		background-color: #fff;
		height: 100vh;
	}
	.content{
		height: calc(100% - 44px);
	}
	.detail-nav-bar{
		position: relative;
		z-index: 22;
		background-color: #fff;
	}
</style>