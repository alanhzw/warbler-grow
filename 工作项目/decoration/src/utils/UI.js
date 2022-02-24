/*
 * @Author: YC
 * @Date: 2020-12-21 11:11:07
 * @LastEditors: YC
 * @LastEditTime: 2020-12-27 17:58:07
 * @Description:
 */

import { Loading, Message, MessageBox } from 'lz-element-ui';

// 加载中
export const LzLoading = {
  start () {
    return Loading.service();
  }
}


// 提示信息
export const LzMsg = {
  info: Message.info,
  error: Message.error,
  success: Message.success,
};
// 确认框
export const LzConfirm = (msg, options = {}) => {
  return MessageBox.confirm(msg, '提示', options)
};

// 确认框
export const LzPrompt = (label, title, options = {}) => {
  return MessageBox.prompt(label, title, options)
};
export default {
  Loading: LzLoading,
  Message: LzMsg,
  confirm: LzConfirm,
  prompt: LzPrompt,
};
