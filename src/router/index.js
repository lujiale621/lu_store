import Vue from 'vue'
import Router from 'vue-router'
import home from '../views/Home.vue'
import mine from '../views/Mine.vue'
import sort from '../views/Sort.vue'
import detail from '../views/Detail.vue'
import login from '../components/login.vue'
import userinform from '../components/userinform.vue'
import error from '../views/error.vue'
Vue.use(Router)
export default new Router({
  routes: [
    { path: '/', redirect: '/home' },
    {
      name: 'Home', path: '/home', component: home, meta: {
        keepAlive: true, // 需要缓存
       
      }
    },
    {
      name: 'mine', path: '/mine', component: mine, 
      children:[
        {
          name: 'login', path: '/mine/login', component: login,
        },
        {
          name: 'userinform', path: '/mine/userinform', component: userinform,
        }
      ],
      meta: {
        keepAlive: false, // 需要缓存 
      }
    },
    {
      name: 'Sort', path: '/sort', component: sort, meta: {
        keepAlive: true // 需要缓存
      }
    },
    {
      name: 'error', path: '/error', component: error, meta: {
        keepAlive: false // 需要缓存
      }
    },
    {
      name: 'Detail', path: '/detail', component: detail, meta: {
        keepAlive: true // 需要缓存
      }
    },
    {
      name: 'Shoporder', path: '/shoppingCart', component: () => import('../views/Shoporder.vue'), meta: {
       
      }
    },
    {
      path: '/collect',
      name: 'Collect',
      component: () => import('../views/Collect.vue'),
      meta: {
       
      }
    },
    {
      path: '/confirmOrder',
      name: 'ConfirmOrder',
      component: () => import('../views/ConfirmOrder.vue'),
      meta: {
      
      }
    }

  ]
})