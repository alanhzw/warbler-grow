/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-12-14 10:50:59
 * @LastEditTime: 2021-12-14 14:39:16
 * @FilePath: \kkb-node\src\09-cors\http.js
 */
// /http/api.js
const http = require('http');
const fs = require('fs');
http.createServer((req, res) => {
  const { method, url } = req;
  if (method == 'GET' && url == '/') {
    fs.readFile('./index.html', (err, data) => {
      res.setHeader('Content-Type', 'text/html');
      res.end(data);
    });
  } else if (method == 'GET' && url == '/api/users') {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader("Access-Control-Allow-Origin", 'http://localhost:3000')
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader("Set-Cookie", 'cookie1=123')
    res.end(JSON.stringify([{ name: 'warbler', age: 23 }]));
  } else if (method == 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.writeHead(200, {
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Headers": "X-Token,Content-Type",
      "Access-Control-Allow-Methods": "PUT"
    });
    res.end();
  }
})
  .listen(4000, () => {
    console.log('api listen at ' + 4000);
  });
