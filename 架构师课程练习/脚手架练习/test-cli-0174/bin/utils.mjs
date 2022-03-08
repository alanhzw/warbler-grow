/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2022-03-08 15:04:10
 * @LastEditTime: 2022-03-08 15:45:22
 * @FilePath: \脚手架练习\test-cli-0174\bin\utils.js
 */

import { pathExistsSync } from 'path-exists';

export function exists(p) {
  return pathExistsSync(p);
}
