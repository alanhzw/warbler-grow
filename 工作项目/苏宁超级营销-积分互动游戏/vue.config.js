/*
 * @Description: 配置webpack
 * @Date: 2020-09-30 17:01:13
 * @LastEditTime: 2020-12-21 14:03:40
 * @Author: hanzhiwei
 * @FilePath: \SNActivity\vue.config.js
 */

module.exports = {
  // debugger 调试
  configureWebpack: {
    devtool: 'source-map',
  },

  // 静态资源路径
  publicPath: '/activity/',
  // publicPath: "/",
  css: {
    // 将组件内的 CSS 提取到一个单独的 CSS 文件 (只用在生产环境中)
    extract: true,
    // 是否开启 CSS source map？
    sourceMap: false,
    // 为预处理器的 loader 传递自定义选项。比如传递给
    // sass-loader 时，使用 `{ sass: { ... } }`。
    loaderOptions: {},
    // 为所有的 CSS 及其预处理文件开启 CSS Modules。
    // 这个选项不会影响 `*.vue` 文件。
    modules: false,
  },

  // 是否生成.map文件
  productionSourceMap: true,
  devServer: {
    disableHostCheck: true,
    https: true,
  },
};
