import { createApp } from 'vue'
import App from './App.vue'
import router from './route';

import store from './store'

import Vant from 'vant';
import 'vant/lib/index.css';

// 处理一下html的font-size，所有c端使用的是rem作为长度单位，为了在B端可以正常显示这里设置一下
(function(doc, win) {
  var docEl = doc.documentElement;
  var bodyEl = doc.body;
  var resizeEvt =
    "orientationchange" in window ? "orientationchange" : "resize";
  var recalc = function() {
    var clientWidth = docEl.clientWidth;
    let clientHeight = docEl.clientHeight;

    if (!clientWidth) return;
    // 设置html的字体，便于使用rem

    if (clientWidth <= clientHeight) {
      //竖屏
      docEl.style.fontSize = 100 * (clientWidth / 750) + "px";
    } else {
      //横屏
      docEl.style.fontSize = 100 * (clientHeight / 750) + "px";
    }
    // 重制body的字号为16px，避免html的字号对B端页面的影响
    bodyEl.style.fontSize = "16px";
  };
  recalc();
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener("DOMContentLoaded", recalc, false);
})(document, window);

const app = createApp(App)
  .use(Vant)
  .use(store)
  .use(router);
var auth = []
app.directive('role', {
  mounted (el, binding) {
    auth = store.state.user.auth;
    const role = auth.find(r => r.action === binding.value)
    console.log(role)
    if (role) {
      if(role.type != 1){
        el.style.display = 'none';
      }
    }else{
      el.style.display = 'none';
    }
  }
})
app.mount('#app');
