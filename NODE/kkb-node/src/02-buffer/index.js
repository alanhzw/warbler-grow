/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-12-08 22:41:17
 * @LastEditTime: 2021-12-08 22:49:14
 * @FilePath: \kkb-node\src\02\index.js
 */

//  Buffer  缓冲区

// 开辟一个十个字节的缓冲区
const buf1 = Buffer.alloc(10)
console.log('🚀🚀~ buf1:', buf1);

// 存储
const buf2 = Buffer.from("a")
console.log('🚀🚀~ buf2:', buf2);

// 存储
const buf3 = Buffer.from('中')
console.log('🚀🚀~ buf3:', buf3);

// 合并缓冲区
const buf4 = Buffer.concat([buf2, buf3])
console.log('🚀🚀~ buf4:', buf4, buf4.toString());