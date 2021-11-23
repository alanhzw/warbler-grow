/*
 * @Description:
 * @Autor: hanzhiwei
 * @Date: 2021-01-03 12:24:10
 * @LastEditTime: 2021-01-09 16:06:06
 * @FilePath: \websocket_test\view\src\main.js
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

import SocketIO from "vue-socket.io";
import ClientSocketIO from "socket.io-client";

Vue.use(
  new SocketIO({
    debug: false,
    connection: ClientSocketIO.connect("http://localhost:3000", {
      transports: ["websocket"],
      autoConnect: false,
    }),
  })
);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
