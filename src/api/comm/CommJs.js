import Vue from "vue";

let CommTool =new Vue({
  methods: {
    getCookie(cookieName) {
      var strCookie = document.cookie;
      var arrCookie = strCookie.split(";");
      for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split("=");
        if (cookieName == arr[0]) {
          return arr[1];
        }
      }
      return "";
    }
  }
});

export default CommTool;
Vue.prototype.$CommTool = CommTool;
