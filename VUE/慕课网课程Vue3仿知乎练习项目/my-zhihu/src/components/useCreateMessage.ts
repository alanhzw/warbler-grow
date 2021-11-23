/*
 * @Description:
 * @Date: 2021-04-12 11:42:07
 * @LastEditTime: 2021-04-28 10:22:52
 * @FilePath: \my-zhihu\src\components\useCreateMessage.ts
 */

import Message from './Message.vue';
import { createApp } from 'vue';
export type MessageType = 'success' | 'error' | 'default';

const createMessage = (message: string, type: MessageType, timout = 2000): void => {
  const messageInstance = createApp(Message, {
    message,
    type,
  });
  const mountNode = document.createElement('div');
  document.body.appendChild(mountNode);
  messageInstance.mount(mountNode);
  setTimeout(() => {
    messageInstance.unmount();
    document.body.removeChild(mountNode);
  }, timout);
};

export default createMessage;
