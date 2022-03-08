/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2022-03-08 15:13:58
 * @LastEditTime: 2022-03-08 15:53:55
 * @FilePath: \脚手架练习\test-cli-0174\bin\core.js
 */
import path from 'path';
import { exists } from './utils';

console.log(path.resolve('.'));
console.log(exists(path.resolve('.')));

(async function () {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log('ok');
})();
