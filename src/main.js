// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// 根级路径下的 js，对应着index.html 中的 app
import Vue from 'vue'
import App from './App'
import router from './api/router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI); //全局使用 Element

import './api/icon/iconfont'
import IconSvg from "./components/comm/IconSvg"
Vue.component('icon', IconSvg); // 全局注册图标组件

import CommUtil from "./api/comm/CommJs";
Vue.prototype.$CommUtil = CommUtil;


Vue.config.productionTip = false;

// 定义VUE全局变量
Vue.prototype.preUrl = "http://localhost:8088";
Vue.prototype.reg_Price = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/; // 采购价正则

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

router.beforeEach((to, from, next) => {
  if (!to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (CommUtil.getToken("TOKEN")) {  // 获取当前的token是否存在
      next(); //  存在Cookie则继续
    }
    else { // 否则跳转登陆
      next({
        path: '/login',
        query: {
          redirect: to.fullPath,   // 将跳转的路由path作为参数，登录成功后跳转到该路由
        }
      })
    }
  }
  else {
    next();
  }
});

/*全局ajax配置*/
$.ajaxSetup({
  dataType: "json",
  cache: false,
  beforeSend(xhr){
    xhr.setRequestHeader("TOKEN", CommUtil.getToken("TOKEN"));
  },
  xhrFields: {
    withCredentials: true
  },
  crossDomain: true,
  complete: function(xhr) {
    console.log(xhr);
    //token过期，则跳转到登录页面
    if(xhr.responseJSON.code === 101){
      console.log("登陆过期，请重新登陆");
      Vue.$router.push('/login');
    }
  }
});
