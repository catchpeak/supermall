<template>
<div id='detail'>
	<detail-nav-bar @titleclick='titleclick' ref='detailnav'
		class='detail-nav-bar'></detail-nav-bar>
	<scroll class='content' ref='scroll' @scroll='contentScroll' :probe-type='2'>
		<detail-swiper :top-images='topImages'></detail-swiper>
		<detail-base-info :goods='goods'></detail-base-info>
		<detail-shop-info :shop='shop'></detail-shop-info>
		<detail-goods-info 
			@detailimgload='detailimgload'
			:detail-info='detailInfo'></detail-goods-info>
		<detail-param-info ref='param' :param-info='paramInfo'></detail-param-info>
		<detail-comment-info ref='comment' :comment-info='commentInfo'></detail-comment-info>
		<goods-list ref='recommend' :goods='recommends'></goods-list>
	</scroll>
	<back-top @click.native='backclick' v-show='isshowbacktop'></back-top>
	<detail-botton-bar @addcart='addtocart'></detail-botton-bar>
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
	import DetailBottonBar from './childcomps/DetailBottonBar'
	
	
	import Scroll from 'components/common/scroll/scroll'
	import GoodsList from 'components/content/goods/GoodsList'
	import {debounce} from 'common/utils/utils.js'
	import backTop from 'components/content/backtop/backtop'
	//数据
	import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail.js'
	import {itemListenertMixin} from 'common/mixin.js'
	
	export default {
		name: 'detail',
		mixins: [itemListenertMixin],
		components: {
			detailNavBar,
			detailSwiper,
			DetailBaseInfo,
			DetailShopInfo,
			Scroll,
			DetailGoodsInfo,
			DetailParamInfo,
			DetailCommentInfo,
			GoodsList,
			DetailBottonBar,
			backTop
		},
		data(){
			return {
				iid: null,
				topImages: [],
				goods: {},
				shop: {},
				detailInfo: {},
				paramInfo: {},
				commentInfo: {},
				recommends: [],
				titleTopsY: [],
				currentindex: 0,
				isshowbacktop: false
			}
		},
		methods:{
			detailimgload(){
				//console.log(this.$refs.scroll)
				this.$refs.scroll.refresh()
				//console.log('接到了')
				//绑定标题位置
				this.titleTopsY = []
				this.titleTopsY.push(0)
			  this.titleTopsY.push(this.$refs.param.$el.offsetTop - 44)
		    this.titleTopsY.push(this.$refs.comment.$el.offsetTop - 44)
		   	this.titleTopsY.push(this.$refs.recommend.$el.offsetTop - 44)
			  //console.log(this.titleTopsY)				
			},
			titleclick(index){
				this.$refs.scroll.scrollTo(0,-this.titleTopsY[index],300)
				this.isshowbacktop = this.titleTopsY[index] > 1000
				//console.log(index,this.titleTopsY[index],this.isshowbacktop)
			},
			contentScroll(position){
				const positiony = -position.y
				let length = this.titleTopsY.length
				this.isshowbacktop = -position.y > 1000
				for(let i=0; i < length; i++){
					if(this.currentindex != i && ((i < length - 1 && positiony>=this.titleTopsY[i] 
						&& positiony<this.titleTopsY[i+1]) || ( i == length - 1 && positiony>=this.titleTopsY[i]))){
							this.currentindex = i
							//console.log(i)
							this.$refs.detailnav.currentIndex = this.currentindex
						}
				}
			},
			backclick(){
				this.$refs.scroll.scrollTo(0,0)
				this.isshowbacktop = false
			},
			addtocart(){
				const product = []
				product.image = this.topImages[0];
				product.title = this.goods.title;
				product.desc = this.goods.desc;
				product.price = this.goods.nowPrice;
				product.iid = this.iid
				//console.log(product)
				this.$store.dispatch('addcart',product)
			}
		},
		mounted(){
		
		},
		destroyed(){
			//console.log('清除')
			this.$bus.$off('itemImageLoad',this.itemImgListener)
		},
		updated(){
//			this.titleTopsY = []
//			this.titleTopsY.push(0)
//			this.titleTopsY.push(this.$refs.param.$el.offsetTop)
//			this.titleTopsY.push(this.$refs.comment.$el.offsetTop)
//			this.titleTopsY.push(this.$refs.recommend.$el.offsetTop)
//			console.log(this.titleTopsY)
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
//				this.$nextTick(() => {
//					this.titleTopsY = []
//					this.titleTopsY.push(0)
//			    this.titleTopsY.push(this.$refs.param.$el.offsetTop)
//			    this.titleTopsY.push(this.$refs.comment.$el.offsetTop)
//		    	this.titleTopsY.push(this.$refs.recommend.$el.offsetTop)
//			    console.log(this.titleTopsY)
//				})
			getRecommend().then( res =>{
				this.recommends = res.data.data.list
			})
			
			})
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
		height: calc(100% - 44px - 49px);
	}
	.detail-nav-bar{
		position: relative;
		z-index: 22;
		background-color: #fff;
	}
</style>