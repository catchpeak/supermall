<template>
	<div id="home">
		<!--<h2>首页</h2>-->
		<nav-bar class='home-nav'>
			<div slot='center'>购物街</div>
		</nav-bar>
		<tab-control class='tab-control' 
				ref='tabcontrol1' 
				:titles="['流行','新款','精选']" 
				@tabClick='tabClick' v-show='istabfixed'></tab-control>
		<scroll class='content' ref='scroll' 
			:pull-up-load='true'
			:probe-type='3' 
			@scroll='contentscroll'
			@pullingUp='loadMore'>
			<home-swiper :banners='banners' @swiperimgload='swiperimgload'></home-swiper>
			<recommend-view :recommends='recommends'></recommend-view>
			<feature-view></feature-view>
			<tab-control  
				ref='tabcontrol2' 
				:titles="['流行','新款','精选']" 
				@tabClick='tabClick'></tab-control>
			<goods-list :goods="showGoods"></goods-list>
		</scroll>
		<back-top @click.native='backclick' v-show='isshowbacktop'></back-top>
	</div>

</template>

<script>
	//子组件
	import HomeSwiper from './childComps/HomeSwiper'
	import RecommendView from './childComps/RecommendView'
	import FeatureView from './childComps/FeatureView'

	//公共组件
	import NavBar from 'components/common/navbar/NavBar'
	import TabControl from 'components/content/tabControl/TabControl'
	import GoodsList from 'components/content/goods/GoodsList'
	import scroll from 'components/common/scroll/scroll'
	import backTop from 'components/content/backtop/backtop'
	
	
	//网络请求
	import { getHomeMultidata, getHomeGods } from 'network/home.js'
  import {debounce} from 'common/utils/utils.js'
	//模拟数据
	//import goodsdata from './data.js'
	import {itemListenertMixin} from 'common/mixin.js'

	export default {
		name: 'home',
		components: {
			NavBar,
			HomeSwiper,
			RecommendView,
			FeatureView,
			TabControl,
			GoodsList,
			scroll,
			backTop
		},
		mixins: [itemListenertMixin],
		data() {
			return {
				banners: [],
				recommends: [],
				isshowbacktop: false,
				goods: {
					'pop': {
						page: 0,
						list: []
					},
					'new': {
						page: 0,
						list: []
					},
					'sell': {
						page: 0,
						list: []
					}
				},
				currentType: 'pop',
				taboffsettop: 0,
				istabfixed: false,
				savey: 0
			}
		},
		computed: {
			showGoods() {
				return this.goods[this.currentType].list
			}
		},
		activated(){
			this.$refs.scroll.refresh()
			this.$refs.scroll.scrollTo(0,this.savey,0)		
			//console.log('ac')
		},
		deactivated(){
			this.savey = this.$refs.scroll.scroll.y
			//console.log('deac')
			
			//取消全局时间监听
			this.$bus.$off('itemImageLoad',this.itemImgListener)
		},
		created() {
			//1.请求多个数据
			this.getHomeMultidata()

				//2.请求商品数据
			this.getHomeGods('pop')
			this.getHomeGods('new')
			this.getHomeGods('sell')
						
		},
		mounted(){
			
		},
		methods: {
			//防抖
//			debounce(func,delay){
//				let timer = null
//				return function(...args){
//					if (timer){
//						clearTimeout(timer)
//					}
//					timer = setTimeout(()=>{
//						func.apply(this,args)
//					},delay)
//				}
//				
//			},
			//事件监听
			tabClick(index) {
				switch(index) {
					case 0:
						this.currentType = 'pop'
						break
					case 1:
						this.currentType = 'new'
						break
					case 2:
						this.currentType = 'sell'
						break
				}
				this.$refs.tabcontrol1.currentIndex = index
				this.$refs.tabcontrol2.currentIndex = index
			},
			backclick(){
				//console.log(this.$refs.scroll.scroll)
				this.$refs.scroll.scrollTo(0,0)
				//console.log('--')
			},
			contentscroll(p){				
				//1.回到顶部
				this.isshowbacktop = -p.y > 1000
				//console.log(p)
				
				//2.吸顶灯
				this.istabfixed = (-p.y) > this.taboffsettop
			},
			loadMore(){
				//console.log('需要加载')
				this.getHomeGods(this.currentType)
				
				//刷新重新计算高度				
//				this.$refs.scroll.refresh()
			},
			swiperimgload(){
				this.taboffsettop = this.$refs.tabcontrol2.$el.offsetTop
				//console.log(this.$refs.tabcontrol.$el.offsetTop)
			},





			//网络请求
			getHomeMultidata() {
				getHomeMultidata().then(res => {
					//console.log(res);
					this.banners = res.data.data.banner.list;
					this.recommends = res.data.data.recommend.list;
					//console.log(this.banners)
				})
			},
			getHomeGods(type) {
				//console.log(type,this.goods[type])
				const page = this.goods[type].page + 1
				//console.log(goodsdata)
				//this.goods[type].list.push(...goodsdata.data.list)

				getHomeGods(type, page).then(res => {
					this.goods[type].list.push(...res.data.data.list);
					this.goods[type].page += 1
					
					this.$refs.scroll.finishpullup()
				})
				//				.catch( err => {
				//					console.log(err)
				//				})
			}

		}
	}
</script>

<style scoped>
	#home {
		/*padding-top: 44px;*/
		height: 100vh;
		position: relative;
	}
	
	.home-nav {
		/*position: fixed;
		left: 0;
		top: 0;
		right: 0;*/
		/*z-index: 10;*/
		background-color: var(--color-tint);
		color: #FFFFFF;
	}
	
	.content{
		/*height: 300px;*/
		overflow: hidden;
		position: absolute;
		top: 44px;
		bottom: 49px;
		left: 0;
		right: 0;
	}
	.tab-control{
		position: relative;
		z-index: 9;
	}

	
	/*.content{
		height: calc(100% - 93px);
		overflow: hidden;
		margin-top: 44px;
	}*/
</style>