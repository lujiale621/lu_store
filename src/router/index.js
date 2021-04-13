
import Vue from 'vue'
import Router from 'vue-router'
import home from '../views/Home.vue'
import sort from '../views/Sort.vue'
import detail from '../views/Detail.vue'

Vue.use(Router)
export default new Router({
  routes: [
    { path: '/', redirect: '/home' },
    {
      name: 'Home', path: '/home', component: home, meta: {
        keepAlive: true // 需要缓存
      }
    },
    {
      name: 'Sort', path: '/sort', component: sort, meta: {
        keepAlive: true // 需要缓存
      }
    },
       {
      name: 'Detail', path: '/detail', component: detail, meta: {
        keepAlive: true // 需要缓存
      }
    }

  ]
})