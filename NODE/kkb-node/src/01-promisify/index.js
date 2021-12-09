/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-12-08 22:27:14
 * @LastEditTime: 2021-12-08 22:41:00
 * @FilePath: \kkb-node\src\01\01.js
 */
(async () => {
  const fs = require("fs")
  // 使用 promisify 可以让一个回调函数形式的异步方法 变成 promise 形式 从而可以使用 async await
  const { promisify } = require("util")
  // 将 fs.readFile 方法 包装成 promise
  const readFile = promisify(fs.readFile)
  // 读取的是个 buffer 对象 ,是 js 用来描述二进制的东西
  const data = await readFile("./test.js")
  // toString方法解析字符串
  console.log("data", data.toString())
})()

