import {debounce} from 'common/utils/utils.js'
import backTop from 'components/content/backtop/backtop'

export const itemListenertMixin = {
	data(){
		return {
			itemImgListener: null
		}
	},
	mounted(){
		const newrefresh = debounce(this.$refs.scroll.refresh,50)
		this.itemImgListener = () => {newrefresh() }			
		this.$bus.$on('itemImageLoad',this.itemImgListener)
	}
}

export const backMixin = {
	components: {
		backTop
	},
	data(){
		return {
			isshowbacktop: false
		}
	},
	methods: {
		backclick(){
				this.$refs.scroll.scrollTo(0,0)
		}		
	}
}
