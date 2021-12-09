/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-12-08 23:50:51
 * @LastEditTime: 2021-12-09 15:24:08
 * @FilePath: \kkb-node\src\04-stream\index.js
 */
const fs = require("fs")

// 读流
const rs = fs.createReadStream('./src/04-stream/main.jpg')

// 写流
const ws = fs.createWriteStream('./src/04-stream/main2.jpg')

rs.pipe(ws)
