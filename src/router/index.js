import Vue from 'vue'
import VueRouter from 'vue-router'

const cart = () => import('../views/cart/cart')
const home = () => import('../views/home/home')
const category = () => import('../views/category/category')
const profile = () => import('../views/profile/profile')
const detail = () => import('../views/detail/detail')

Vue.use(VueRouter)

const routes = [
{
	path: '',
	redirect: '/home'
},
{
	path: '/home',
	component: home
},
{
	path: '/cart',
	component: cart
},
{
	path: '/category',
	component: category
},
{
	path: '/profile',
	component: profile
},
{
	path: '/detail/:iid',
	component: detail
}
]



const router  = new VueRouter({
	routes,
	mode: 'history'
})


export default router