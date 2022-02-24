/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-12-14 18:20:27
 * @LastEditTime: 2021-12-17 09:58:07
 * @FilePath: \nuxt-template-admin\nuxt.config.ts
 */
import { defineNuxtConfig } from 'nuxt3';
import { resolve } from 'pathe';

export default defineNuxtConfig({
  meta: {
    title: '模板管理中心',
  },
  css: ['assets/scss/index.scss'],
  alias: {
    images: resolve(__dirname, './assets/images'),
    style: resolve(__dirname, './assets/style'),
    data: resolve(__dirname, './assets/other/data'),
  },
});
