import {debounce} from 'common/utils/utils.js'
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
