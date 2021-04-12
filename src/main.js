import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vant from 'vant';
import 'vant/lib/index.css';
import router from './router';
import ViewUI from 'view-design';
import vuescroll from 'vuescroll'
import 'view-design/dist/styles/iview.css';
import { Lazyload } from 'vant';
Vue.prototype.$target = "http://localhost:3000/"; // 本地后端地址
Vue.use(ElementUI);
Vue.use(Lazyload);
Vue.config.productionTip = false
Vue.use(Vant);
Vue.use(ViewUI);
import Axios from 'axios';
Vue.use(vuescroll, {
  ops: {}
})
Vue.prototype.$axios = Axios;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
