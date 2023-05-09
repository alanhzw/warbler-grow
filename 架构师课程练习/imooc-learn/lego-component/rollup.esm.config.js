/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2022-06-10 16:57:27
 * @LastEditTime: 2022-06-13 16:35:10
 * @FilePath: \lego-component\rollup.esm.config.js
 */

import baseConfig, { name, file } from './rollup.config'

export default {
  ...baseConfig,
  output: {
    name,
    file: file('esm'),
    format: 'es'
  }
}