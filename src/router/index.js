
import Vue from 'vue'
import Router from 'vue-router'
import home from '../views/Home.vue'
Vue.use(Router)
export default new Router({
    routes: [
      { path: '/', redirect: '/home' },
      { name:'Home', path: '/home', component: home },

    ]
  })