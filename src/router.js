//import Vue from 'vue'
import {createRouter, createWebHistory} from 'vue-router'

//Vue.use(Router)


export default new createRouter({

mode: 'history',
history: createWebHistory(),
base: process.env.BASE_URL,
routes: [

    {
       path: '/owsmgpgmrwpogmomgro',
       name: 'homes',
       component: () => import('./App.vue')
    },
    {
      path: '/',
      name: 'home',
      component: () => import('./components/Home/ho-me.vue')
   },
    {
        path: '/products',
        name: 'products',
        component: () => import('./components/StoreProductCatalog/store-product-catalog.vue')
     },
     {
      path: '/signup',
      name: 'signup',
      component: () => import('./components/SignUp/sign-up.vue')
     },
     {
      path: '/login',
      name: 'login',
      component: () => import('./components/Login/log-in.vue')
     },
     {
      path: '/stores',
      name: 'stores',
      component: () => import('./components/StoresCatalog/stores-catalog.vue')
     },
     {
      path: '/profile',
      name: 'profile',
      component: () => import('./components/Profile/pro-file.vue')
     },
     {
      path: '/store/:id',
      name: 'store',
      component: () => import('./components/StoreProductCatalog/store-product-catalog.vue')
     },
     {
      path: '/buy',
      name: 'buy',
      component: () => import('./components/buy-order.vue')
     },
     {
      path: '/storemanagement',
      name: 'storemanagement',
      component: () => import('./components/store-management.vue')
     },
     {
      path: '/editproduct/:id',
      name: 'editproduct',
      component: () => import('./components/edit-product.vue')
     },
     {
      path: '/createproduct',
      name: 'createproduct',
      component: () => import('./components/create-product.vue')
     },
     {
      path: '/editstore',
      name: 'editstore',
      component: () => import('./components/edit-store.vue')
     },
     {
      path: '/myorders',
      name: 'myorders',
      component: () => import('./components/myOrders.vue')
     },




]





})