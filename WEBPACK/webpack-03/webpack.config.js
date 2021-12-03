/*
 * @Author: 一尾流莺
 * @Description:webpack 配置文件
 * @Date: 2021-11-26 00:21:48
 * @LastEditTime: 2021-12-03 09:47:28
 * @FilePath: \webpack-03\webpack.config.js
 */

const path = require('path')
const htmlWebpackPlugin = require("html-webpack-plugin")
// 模糊匹配路径
const glob = require('glob')

// 自动生成 entry 和 htmlWebpackPlugins
const setMap = () => {
  const entry = {};
  const htmlWebpackPlugins = []
  // 模糊匹配 src 目录下 任意目录下的 index.js 返回的是文件的绝对路径
  const entryFiles = glob.sync(path.join(__dirname, "./src/*/index.js"))
  // 遍历匹配到的结果
  entryFiles.forEach((entryFile) => {
    // 获取到文件名
    const pageName = entryFile.match(/src\/(.*)\/index\.js$/)[1]
    // 生成 entry
    entry[pageName] = entryFile
    // 生成 htmlWebpackPlugins
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
  ],
}







// 所有的页面模块 必须以目录的方式存在