import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import fs from 'fs';
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

import dotenv, { DotenvParseOutput } from 'dotenv';
export default defineConfig(({ mode, command }) => {
  // 获取当前的模式
  console.log('🚀🚀 ~ 打包编译阶段还是编码阶段', command);
  console.log('🚀🚀 ~ 当前在什么环境运行项目', mode);
  // 定义文件前缀
  const envFilePrefix: string = '.env.';
  // 获取当前模式下对应的环境变量文件
  const curEnvFileName = `${envFilePrefix}${mode}`;
  // 读取环境变量文件
  const envData = fs.readFileSync(curEnvFileName);
  // 把读取到的结果解析成对象
  const envMap: DotenvParseOutput = dotenv.parse(envData);
  return {
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      host: envMap.VITE_HOST,
      port: envMap.VITE_PORT as unknown as number,
      proxy: {
        [envMap.VITE_BASE_URL]: {
          target: envMap.VITE_PROXY_DOMAIN,
        },
      },
    },
  };
});
