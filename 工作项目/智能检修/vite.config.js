const dotenv = require('dotenv');
const path = require('path');
const fs = require("fs")

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const envFiles = [
  // /** default file */ `.env`,
  /** mode file */ `.env.${process.env.NODE_ENV || 'development'}`
]

for (const file of envFiles) {
  const envConfig = dotenv.parse(fs.readFileSync(file))
  for (const k in envConfig) {
    process.env[k] = envConfig[k]
  }
}
// console.log(process.env.NODE_ENV)
console.log('🚀 ~ process.env.NODE_ENV', process.env.NODE_ENV);
// console.log(import.meta);

export default defineConfig({
  base: '/h5',  // 'development' === process.env.NODE_ENV ? '/' : '/h5/',
  plugins: [vue()],
  resolve: {
    alias: {
      '/@/': path.resolve(__dirname, './src')
    },
  }
})
