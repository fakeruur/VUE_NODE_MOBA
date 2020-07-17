import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import axios from 'axios'

import './assets/style.scss'

const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api'
})
Vue.prototype.$http = http

// 请求拦截器
http.interceptors.request.use(function (config) {
  if (sessionStorage.token) {
    // 把token赋值给headers，给服务端判断是否登录
    config.headers.Authorization = 'Bearer ' + sessionStorage.token //规范 前端Authorization大写
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});



//响应拦截器,通用的处理error信息 收到的任何错误都会走这个响应拦截器
http.interceptors.response.use(res => {
  return res
}, err => { // 错误会进入这里
  if (err.response.data.message) {
    // 把$message方法加入到Vue原型上了
    //方便监听错误信息
    Vue.prototype.$message.error({
      message: err.response.data.message
    })

    //如果返回 401 则是未登录
    if (err.response.status === 401) {
      router.push('/login')
    }
    return Promise.reject(err)
  }
})

Vue.config.productionTip = false


Vue.mixin({
  methods:{
    getAuthHeadersMixin(){
      return{
        Authorization:`Bearer ${sessionStorage.token}`
      }
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
