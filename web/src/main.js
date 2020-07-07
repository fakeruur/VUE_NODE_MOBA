import Vue from 'vue'
import App from './App.vue'

import './assets/scss/style.scss'
import router from './router'

// 轮播图
import VueAwesomeSwiper from 'vue-awesome-swiper'
// import style
// import 'swiper/swiper-bundle.css'
import 'swiper/dist/css/swiper.css'

// 使用 axios
import axios from 'axios'
Vue.prototype.$http = axios.create({
  baseURL:'http://localhost:3000/web/api'
})


Vue.use(VueAwesomeSwiper, /* { default options with global component } */)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
