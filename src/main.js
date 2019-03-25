// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// 根级路径下的 js，对应着index.html 中的 app
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import CommTool from "./assets/CommJs";

Vue.use(ElementUI);

Vue.config.productionTip = false;

// 定义VUE全局变量
Vue.prototype.preUrl = "http://localhost:8088";
Vue.prototype.reg_Price = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;

// 定义JS全局变量

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

$.ajaxSetup({
  dataType: "json",
  // cache: false,
  headers: {
    "TOKEN": CommTool.getCookie("TOKEN")
  },
  xhrFields: {
    withCredentials: true
  },
  crossDomain: true,
  // complete: function(xhr) {
  //   //token过期，则跳转到登录页面
  //   if(xhr.responseJSON.code == 401){
  //     parent.location.href = baseURL + 'login.html';
  //   }
  // }
});

/*router.beforeEach((to, from, next) => {
  if (!to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (CommTool.getCookie("TOKEN")) {  // 通过vuex state获取当前的token是否存在
      next();
    }
    else {
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
});*/


// $(window).keydown(function (e) {
//   if (e.keyCode == '116') {
//     let url = document.location.href;
//     let urls = url.split("/");
//     let length = urls.length;
//     if(length > 1) url = '/' + urls[length-1];
//     else url = '/';
//     console.log(url);
//     Vue.$router.push(url);
//     return false;
//   }
// });
