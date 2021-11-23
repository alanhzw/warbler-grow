/*
 * @Description:
 * @Date: 2021-03-19 17:13:28
 * @LastEditTime: 2021-03-25 10:34:20
 * @FilePath: \vite-project-js\vite.config.js
 */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { viteMockServe } from 'vite-plugin-mock';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  // 定义别名
  alias: {
    '@': path.resolve(__dirname, 'src'),
    coms: path.resolve(__dirname, 'src/components'),
    assets: path.resolve(__dirname, 'src/assets'),
    utils: path.resolve(__dirname, 'src/utils'),
    views: path.resolve(__dirname, 'src/views'),
    routes: path.resolve(__dirname, 'src/routes'),
    plugins: path.resolve(__dirname, 'src/plugins'),
  },
  proxy: {
    // 选项写法
    '/api': {
      target: 'http://123.56.85.24:5000', // 代理网址
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ''),
    },
  },
  css: {},
  plugins: [
    vue(),
    viteMockServe({
      supportTs: false,
    }),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    }),
  ],
  server: {
    port: 4000, // 启动端口
    open: true,
    cors: true,
  },
});
