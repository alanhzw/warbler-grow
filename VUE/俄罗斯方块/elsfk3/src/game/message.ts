/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-10-19 15:10:20
 * @LastEditTime: 2021-10-19 15:12:29
 * @FilePath: \elsfk3\src\game\message.ts
 */
import { io } from 'socket.io-client';

let socket;
export function initMessage() {
  socket = io('http://localhost:3001');
  console.log('🚀🚀~ socket:', socket);
  socket.on('connect', () => {
    console.log('🚀🚀~ 连接成功');
  });
}

export const message = {
  emit(...args) {
    return socket.emit(...args);
  },
  on(...args) {
    return socket.on(...args);
  },
};
