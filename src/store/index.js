import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		cartlist: []
	},
	mutations: {
		addcounter(state,payload){
			payload.count++
		},
		addtocart(state,payload){
			state.cartlist.push(payload)
		}
	},
	actions: {
		addcart(context,payload){
			let product = context.state.cartlist.find(function (item){
				return item.iid === payload.iid
			})			
			if(product){
				context.commit('addcounter',product)
			}else{
				payload.count = 1
				context.commit('addtocart',payload)
			}
			//console.log(state.cartlist)
		}
	}
})


export default store