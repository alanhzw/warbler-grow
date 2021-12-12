/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-12-12 16:09:08
 * @LastEditTime: 2021-12-12 16:09:08
 * @FilePath: \kkb-node\src\08-socket\index.js
 */
const net = require("net")
const chatServer = new.createServer()
const clientList = []