import axios from 'axios'

//1.
export function request(config,success,faile){
	const instance = axios.create({
		//新接口
		baseURL: 'https://api.juanertu.com/mallapi',
		//baseURL: 'http://123.207.32.32:8000',
		//https://api.juanertu.com/mallapi
		timeout: 5000
	})
	//axios拦截器,需要return 
	//instance.interceptors.request.use(config=>{ return config},err=>{})
	//instance.interceptors.response.use( result=>{ return result.data},err=>{})
	instance.interceptors.request.use(config => {		
		return config
	},err => { console.log(err)})
	instance.interceptors.response.use(res => {
		return res
	},err => { console.log(err)})
	
	
	//发送网络请求1.
//	instance(config)
//		.then( res => { success(res)})
//		.catch( err => { faile(err)})

//2.
		return instance(config)
}


