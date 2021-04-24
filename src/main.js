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
import store from './store'
import './assets/iconfont/iconfont.css'
import './assets/iconfont2/iconfont.js'
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
Axios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    router.push({ path: "/error" });
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  res => {
    if (res.data.code === "401") {
      Vue.prototype.notifyError(res.data.msg);
      store.dispatch("setShowLogin", true);
    }
    if (res.data.code === "500") {
      router.push({ path: "/error" });
    }
    return res;
  },
  error => {
    router.push({ path: "/error" });
    return Promise.reject(error);
  }
);

// 全局拦截器,在进入需要用户权限的页面前校验是否已经登录
router.beforeResolve((to, from, next) => {
  const loginUser = store.state.user.user;
  // 判断路由是否设置相应校验用户权限
  if (to.meta.requireAuth) {
    if (!loginUser) {
      // 没有登录，显示登录组件
      store.dispatch("setShowLogin", true);
      if (from.name == null) {
        //此时，是在页面没有加载，直接在地址栏输入链接，进入需要登录验证的页面
        next("/");
        return;
      }
      // 终止导航
      next(false);
      return;
    }
  }
  next();
});

// 相对时间过滤器,把时间戳转换成时间
// 格式: 2020-02-25 21:43:23
Vue.filter('dateFormat', (dataStr) => {
  var time = new Date(dataStr);
  function timeAdd0 (str) {
    if (str < 10) {
      str = '0' + str;
    }
    return str;
  }
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  return y + '-' + timeAdd0(m) + '-' + timeAdd0(d) + ' ' + timeAdd0(h) + ':' + timeAdd0(mm) + ':' + timeAdd0(s);
});
Vue.prototype.notifySucceed = function (msg) {
  this.$notify({
    title: "成功",
    message: msg,
    type: "success",
    offset: 100
  });
};
// 封装提示失败的弹出框
Vue.prototype.notifyError = function (msg) {
  this.$notify.error({
    title: "错误",
    message: msg,
    offset: 100
  });
};
new Vue({
  router,store,
  render: h => h(App),
}).$mount('#app')
