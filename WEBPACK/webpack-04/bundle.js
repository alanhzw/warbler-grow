/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-12-06 14:32:04
 * @LastEditTime: 2021-12-06 14:35:45
 * @FilePath: \webpack-04\bundle.js
 */
const webpack = require("./lib/webpack")

const config = require("./webpack.config")

new webpack(config).run()