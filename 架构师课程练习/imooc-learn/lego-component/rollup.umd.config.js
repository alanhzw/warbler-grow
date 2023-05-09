/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2022-06-13 16:27:53
 * @LastEditTime: 2022-06-13 16:45:17
 * @FilePath: \lego-component\rollup.umd.config.js
 */
import baseConfig, { file } from './rollup.config'

export default {
  ...baseConfig,
  output: {
    name: 'LegoComponents',
    file: file('umd'),
    format: 'umd',
    // 第三方库的全局变量名称
    globals: {
      'vue': "Vue",
      'lodash-es': '_'
    },
    // 组件库的全局变量名称
    exports: 'named'
  },
}