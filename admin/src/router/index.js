import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from '../views/Main.vue'
import Login from '../views/Login.vue'

import CategoryEdit from '../views/others/CategoryEdit.vue'
import CategoryList from '../views/others/CategoryList.vue'

import ItemEdit from '../views/others/ItemEdit.vue'
import ItemList from '../views/others/ItemList.vue'

import HeroEdit from '../views/others/HeroEdit.vue'
import HeroList from '../views/others/HeroList.vue'

import ArticleEdit from '../views/others/ArticleEdit.vue'
import ArticleList from '../views/others/ArticleList.vue'

import AdEdit from '../views/others/AdEdit.vue'
import AdList from '../views/others/AdList.vue'

import AdminUserEdit from '../views/admin/AdminUserEdit.vue'
import AdminUserList from '../views/admin/AdminUserList.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/login', name: 'login', component: Login, meta: { isPublic: true } }, //可以公开访问
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      { path: '/categories/create', component: CategoryEdit },
      { path: '/categories/list', component: CategoryList },
      { path: '/categories/edit/:id', component: CategoryEdit, props: true },

      { path: '/items/create', component: ItemEdit },
      { path: '/items/list', component: ItemList },
      { path: '/items/edit/:id', component: ItemEdit, props: true },

      { path: '/heroes/create', component: HeroEdit },
      { path: '/heroes/list', component: HeroList },
      { path: '/heroes/edit/:id', component: HeroEdit, props: true },

      { path: '/articles/create', component: ArticleEdit },
      { path: '/articles/list', component: ArticleList },
      { path: '/articles/edit/:id', component: ArticleEdit, props: true },

      { path: '/ads/create', component: AdEdit },
      { path: '/ads/list', component: AdList },
      { path: '/ads/edit/:id', component: AdEdit, props: true },

      { path: '/admin_users/create', component: AdminUserEdit },
      { path: '/admin_users/list', component: AdminUserList },
      { path: '/admin_users/edit/:id', component: AdminUserEdit, props: true },
    ]
  },

]

const router = new VueRouter({
  routes,
  mode: 'history'
})

// 导航守卫
router.beforeEach((to,from,next)=>{
if (!to.meta.isPublic && !window.sessionStorage.getItem('token')) {
  return next('/login')
}
  next()
})

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
