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
      component: () => import('./components/pages/Home/ho-me.vue')
   },
    {
        path: '/products',
        name: 'products',
        component: () => import('./components/pages/StoreProductCatalog/store-product-catalog.vue')
     },
     {
      path: '/signup',
      name: 'signup',
      component: () => import('./components/pages/SignUp/sign-up.vue')
     },
     {
      path: '/login',
      name: 'login',
      component: () => import('./components/pages/Login/log-in.vue')
     },
     {
      path: '/stores',
      name: 'stores',
      component: () => import('./components/pages/StoresCatalog/stores-catalog.vue')
     },
     {
      path: '/profile',
      name: 'profile',
      component: () => import('./components/pages/Profile/pro-file.vue')
     },
     {
      path: '/store/:id',
      name: 'store',
      component: () => import('./components/pages/StoreProductCatalog/store-product-catalog.vue')
     },
     {
      path: '/buy',
      name: 'buy',
      component: () => import('./components/pages/buy-order.vue')
     },
     {
      path: '/storemanagement',
      name: 'storemanagement',
      component: () => import('./components/pages/store-management.vue')
     },
     {
      path: '/editproduct/:id',
      name: 'editproduct',
      component: () => import('./components/pages/edit-product.vue')
     },
     {
      path: '/createproduct',
      name: 'createproduct',
      component: () => import('./components/pages/create-product.vue')
     },
     {
      path: '/editstore',
      name: 'editstore',
      component: () => import('./components/pages/edit-store.vue')
     },
     {
      path: '/myorders',
      name: 'myorders',
      component: () => import('./components/pages/myOrders.vue')
     },
     {
      path: '/faq',
      name: 'faq',
      component: () => import('./components/pages/faq.vue')
     },
     {
      path: '/repeatorder',
      name: 'repeatorder',
      component: () => import('./components/pages/repeatOrder.vue')
     },
     {
      path: '/receivedorders',
      name: 'rreceivedorders',
      component: () => import('./components/pages/storeOrdersReceived.vue')
     },




]





})