import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from '../views/Main.vue'

const Home = () => import('../views/Home.vue')
const Article = () => import('../views/Article.vue')
const Hero = () => import('../views/Hero.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      { path: '/', name: 'home', component: Home },
      { path: '/articles/:id', name: 'article', component: Article, props: true } //通过路由传递参数
      // { path: '/', name: 'home', component: Home }
    ]
  },
  {
    path: '/heroes/:id', name: 'hero', component: Hero, props: true  //通过路由传递参数
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
