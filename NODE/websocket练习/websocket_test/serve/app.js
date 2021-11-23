/*
 * @Description:
 * @Autor: hanzhiwei
 * @Date: 2021-01-03 12:24:57
 * @LastEditTime: 2021-01-09 16:31:43
 * @FilePath: \websocket_test\serve\app.js
 */
//引用express框架
var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000, () => {
  console.log("服务器已连接");
});

io.on("connection", function (socket) {
  console.log("有人连接了", socket.id);
  socket.on("emit_method", require("./websocket/weChant/chant"));
  socket.emit("show", 1);
});
