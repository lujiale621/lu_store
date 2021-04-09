import Vue from 'vue'
import App from './App.vue'
import Vant from 'vant';
import 'vant/lib/index.css';
import router from './router';
import ViewUI from 'view-design';

import 'view-design/dist/styles/iview.css';

Vue.config.productionTip = false
Vue.use(Vant);
Vue.use(ViewUI);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
