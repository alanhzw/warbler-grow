/*
 * @Author: δΈε°Ύζ΅θΊ
 * @Description:
 * @Date: 2021-10-19 15:10:20
 * @LastEditTime: 2021-10-19 15:12:29
 * @FilePath: \elsfk3\src\game\message.ts
 */
import { io } from 'socket.io-client';

let socket;
export function initMessage() {
  socket = io('http://localhost:3001');
  console.log('ππ~ socket:', socket);
  socket.on('connect', () => {
    console.log('ππ~ θΏζ₯ζε');
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
