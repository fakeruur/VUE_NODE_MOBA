import Vue from 'vue'
import App from './App.vue'

import './assets/scss/style.scss'
import router from './router'

// 轮播图
import VueAwesomeSwiper from 'vue-awesome-swiper'
// import style
// import 'swiper/swiper-bundle.css'
import 'swiper/dist/css/swiper.css'


Vue.use(VueAwesomeSwiper, /* { default options with global component } */)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
