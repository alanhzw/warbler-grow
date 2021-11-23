/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-07-23 18:27:57
 * @LastEditTime: 2021-09-26 11:35:52
 * @FilePath: \elsfk2\src\main.js
 */
import { imitateDelay } from 'warbler-js';
import { capitalizeWord } from 'warbler-js';

async function test() {
  console.log('The first log');
  await imitateDelay(1000);
  console.log('The second log with 1000 ms delay'); // => 1000 毫秒后输出 The second log with 1000 ms delay
  const initStr = 'hello world , my name is warbler !';
  const finallyStr = capitalizeWord(initStr);
  console.log(finallyStr); // => Hello World , My Name Is Warbler !
}
test();