/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2022-01-19 14:53:22
 * @LastEditTime: 2022-01-19 14:59:02
 * @FilePath: \interact\vue.config.js
 */
const path = require('path');

console.log('--------ENV-----------');
console.log('NODE_ENV', process.env.NODE_ENV);
console.log('VUE_APP_PLATFORM', process.env.VUE_APP_PLATFORM);
console.log('VUE_APP_MODE', process.env.VUE_APP_MODE);
console.log('VUE_APP_PUBLICPATH', process.env.VUE_APP_PUBLICPATH);
console.log('----------------------');

const pages = {
  b: {
    index: {
      entry: './src/business/business.js',
      template: './public/web.html',
    },
  },
  c: {
    index: {
      entry: './src/mobile/mobile.js',
      template: './public/mobile.html',
    },
  },
};

module.exports = {
  lintOnSave: false,
  /**
   * 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。然而，这也要求 index 的 HTML 是被 Vue CLI 自动生成的。如果你无法使用 Vue CLI 生成的 index HTML，你可以通过将这个选项设为 false 来关闭文件名哈希。
   */
  filenameHashing: false, // 文件名添加哈希
  productionSourceMap: process.env.NODE_ENV !== 'production',
  css: {
    extract: true,
    loaderOptions: {
      sass: {
        // eslint-disable-next-line import/no-extraneous-dependencies
        implementation: require('sass'), // This line must in sass option
      },
    },
  },
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.json', '.vue'],
      alias: {
        moment: 'dayjs', // 使用dayjs 替换moment
        '@': path.resolve(__dirname, 'src/'),
        '@admin': path.resolve(__dirname, 'src/admin'),
        '@business': path.resolve(__dirname, 'src/business'),
        '@mobile': path.resolve(__dirname, 'src/mobile'),
      },
    },
  },
  chainWebpack: (config) => {
    config.optimization.delete('splitChunks');
  },
  pages: pages[process.env.VUE_APP_PLATFORM],
  outputDir: `dist/${process.env.VUE_APP_PLATFORM}`,
  publicPath: process.env.VUE_APP_PUBLICPATH,
  devServer: {
    port: process.env.VUE_APP_DEV_SERVER_PORT,
    disableHostCheck: true,
    proxy: {
      '^/a': {
        target: 'http://116.196.106.97:30003',
        changeOrigin: true,
      },
      '^/b': {
        target: 'http://116.196.106.97:30003',
        changeOrigin: true,
      },
      '^/c': {
        target: 'http://116.196.106.97:30004',
        changeOrigin: true,
      },
    },
  },
};
