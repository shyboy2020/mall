import Vue from 'vue'
import VueRouter from "vue-router";

const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Cart = () => import('../views/cart/Cart')
const Profile = () => import('../views/profile/Profile')

//1.安装插件
Vue.use(VueRouter)

//2.创建router
const routes = [
  {
    path:'',
    redirect:'/home'
  },
  {
    path: '/home',
    component:Home
  },
  {
    path:'/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path:'/profile',
    component: Profile
  }
]
const router = new VueRouter({
  routes,
  mode:'history'
})

export default router

// import {createRouter,createWebHistory} from 'vue-router'
// import Home from '@/views/home/Home'
// import Category from "@/views/category/Category";
// import Cart from "@/views/cart/Cart";
// import Profile from "@/views/profile/Profile";
// const routerHistory = createWebHistory()
// const router = createRouter({
//   history:routerHistory,
//   routes: [
//     {
//       path:'',
//       redirect:'/home'
//     },
//     {
//       path: '/home',
//       component:Home
//     },
//     {
//       path:'/category',
//       component: Category
//     },
//     {
//       path: '/cart',
//       component: Cart
//     },
//     {
//       path:'/profile',
//       component: Profile
//     }
//   ]
// })
// export default router