/*
 * @Author: 一尾流莺
 * @Description:任意组件传值
 * @Date: 2021-12-16 10:00:25
 * @LastEditTime: 2021-12-16 10:42:24
 * @FilePath: \nuxt-template-admin\composables\useMitt.ts
 */
import mitt, { Emitter } from 'mitt';
type Events = {
  'form-item-created': () => {};
};
export const emitter: Emitter<Events> = mitt<Events>();
