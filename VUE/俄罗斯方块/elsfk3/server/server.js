/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-10-19 11:39:40
 * @LastEditTime: 2021-10-19 15:49:36
 * @FilePath: \elsfk3\server\server.js
 */
const Koa = require('koa');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { log } = require('console');

const app = new Koa();
const httpServer = createServer(app.callback());
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000'
  }
});

io.on('connection', (socket) => {
  socket.on('left', () => {
    io.emit('left');
  });
  socket.on('right', () => {
    io.emit('right');
  });
  socket.on('rotate', () => {
    io.emit('rotate');
  });
  socket.on('down', () => {
    io.emit('down');
  });
});

httpServer.listen(3001);