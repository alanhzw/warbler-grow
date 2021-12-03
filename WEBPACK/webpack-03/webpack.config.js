/*
 * @Author: 一尾流莺
 * @Description:webpack 配置文件
 * @Date: 2021-11-26 00:21:48
 * @LastEditTime: 2021-12-02 18:18:54
 * @FilePath: \webpack-03\webpack.config.js
 */

const path = require('path')
const htmlWebpackPlugin = require("html-webpack-plugin")
const minicss = require("mini-css-extract-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// 模糊匹配路径
const glob = require('glob')

const setMap = () => {
  const entry = {};
  const htmlWebpackPlugins = []

  const entryFiles = glob.sync(path.join(__dirname, "./src/*/index.js"))
  console.log('🚀🚀~ entryFiles:', entryFiles);

  entryFiles.forEach((entryFile) => {
    const pageName = entryFile.match(/src\/(.*)\/index\.js$/)[1]
    entry[pageName] = entryFile
    htmlWebpackPlugins.push(
      new htmlWebpackPlugin({
        template: `./src/${pageName}/index.html`,
        filename: `${pageName}.html`,
        chunks: [pageName]
      }))
  })

  return {
    entry,
    htmlWebpackPlugins
  }
}

const { entry, htmlWebpackPlugins } = setMap()

// 配置文件
module.exports = {
  entry,
  // 输出资源文件的信息
  output: {
    // 存储位置
    path: path.resolve(__dirname, './dist'),
    // 文件名称
    filename: " [name].js"
  },
  // 打包模式
  mode: "development",
  // 插件
  plugins: [
    ...htmlWebpackPlugins,
    // 把css抽离成独立文件 , 不用style的方式
    new minicss({
      filename: 'style/index.css'
    }),
    new CleanWebpackPlugin()
  ],
}







// 所有的页面模块 必须以目录的方式存在