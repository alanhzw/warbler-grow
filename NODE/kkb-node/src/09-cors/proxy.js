/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-12-14 11:23:52
 * @LastEditTime: 2021-12-14 15:23:56
 * @FilePath: \kkb-node\src\09-cors\proxy.js
 */
// proxy.js
const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express()

app.use(express.static(__dirname + '/'))
app.use('/api', createProxyMiddleware({
  target: 'http://localhost:4000', changeOrigin: false
}));
app.listen(3000)

