/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2022-01-10 11:02:42
 * @LastEditTime: 2022-01-10 11:27:29
 * @FilePath: \common_c\vue.config.js
 */
// const CompressionPlugin = require('compression-webpack-plugin');
// const TimeStamp = new Date().getTime();

module.exports = {
  lintOnSave: false,
  publicPath: process.env.VUE_PUBLIC_PATH,
  outputDir: 'dist',
  productionSourceMap: false,
  runtimeCompiler: false, // 运行时版本是否需要编译
  filenameHashing: true, // 生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存
  css: {
    // 将组件内的 CSS 提取到一个单独的 CSS 文件 (只用在生产环境中)
    extract: true,
    // 是否开启 CSS source map？
    sourceMap: false,
    // 为预处理器的 loader 传递自定义选项。比如传递给
    // sass-loader 时，使用 `{ sass: { ... } }`。
    loaderOptions: {
      sass: {
        implementation: require('sass'), // This line must in sass option
      },
    },
    // 为所有的 CSS 及其预处理文件开启 CSS Modules。
    // 这个选项不会影响 `*.vue` 文件。
    modules: false,
  },

  devServer: {
    open: process.platform === 'darwin',
    host: 'localhost',
    port: 32200,
    proxy: {
      '/api/c': {
        target: 'https://lzdz4-isv.isvjcloud.com/apps/rights/api/c',
        changeOrigin: true,
        pathRewrite: {
          '^/api/c': '', // 代理的路径
        },
      },
    }, // 设置代理
    disableHostCheck: true, //  新增该配置项
    before: (app) => {
    },
  },
  chainWebpack: (config) => {
    config.optimization.runtimeChunk = 'single';
    config.optimization.minimize(true);
    config.optimization.splitChunks({
      chunks: 'all',
      minSize: 20000,
    });
    // 移除 prefetch 插件
    config.plugins.delete('prefetch');
    // 移除 preload 插件
    config.plugins.delete('preload');
  },
  configureWebpack: {
    externals: {
      vue: 'Vue',
      LocalScrollFix: 'LocalScrollFix',
      vuex: 'Vuex',
      'vue-router': 'VueRouter',
      axios: 'axios',
    },
    plugins: [

    ],
    // output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.js】
    //   filename: `js/[name].${TimeStamp}.js`,
    //   chunkFilename: `js/[name].${TimeStamp}.js`
    // }
  },
};
