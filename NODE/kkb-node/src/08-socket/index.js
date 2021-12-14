/*
 * @Author: 一尾流莺
 * @Description:TCP协议 - 实现一个即时通讯IM
 * @Date: 2021-12-12 16:09:08
 * @LastEditTime: 2021-12-12 16:31:26
 * @FilePath: \kkb-node\src\08-socket\index.js
 */

// 用于TCP通讯
const net = require("net")
// 创建服务
const chatServer = net.createServer()
// 用户列表
const clientList = []
// 监听连接事件
chatServer.on('connection', client => {
  // client => 流
  client.write("Hello\n")
  // 添加到用户列表
  clientList.push(client)
  client.on('data', data => {
    // data => 二进制通讯  Buffer
    console.log('🚀🚀~ receive:', data.toString());
    // 广播
    clientList.forEach((cli) => {
      cli.write(data)
    })
  })
})

// 监听端口
chatServer.listen(9000)