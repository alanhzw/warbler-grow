/*
 * @Description:
 * @Date: 2021-03-29 18:50:51
 * @LastEditTime: 2021-04-09 18:44:59
 * @FilePath: \my-zhihu\vite.config.ts
 */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { join } from 'path';
import { viteMockServe } from 'vite-plugin-mock';
export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@/',
        replacement: join(__dirname, 'src'),
      },
    ],
  },
  plugins: [vue(), viteMockServe({ supportTs: true })],
  // server: {
  //   port: 3008,
  //   proxy: {
  //     '/api': {
  //       target: 'http://api.vikingship.xyz/111',
  //       changeOrigin: true,
  //       ws: true,
  //       rewrite: (path) => path.replace(/^\/api/, ''),
  //     },
  //   },
  // },
});
