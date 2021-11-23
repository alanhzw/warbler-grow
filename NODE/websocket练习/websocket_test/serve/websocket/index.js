/*
 * @Description:
 * @Autor: hanzhiwei
 * @Date: 2021-01-09 14:58:50
 * @LastEditTime: 2021-01-09 15:05:47
 * @FilePath: \websocket_test\serve\websocket\index.js
 */
(() => {
  var io = require("socket.io");

  io.on("connection", function (socket) {
    console.log("有人连接了");
    socket.on("emit_method", function (data) {
      console.log(data);
    });
  });
})();
