/*
 * @Author: δΈε°Ύζ΅θΊ
 * @Description:
 * @Date: 2021-12-08 22:50:47
 * @LastEditTime: 2021-12-09 15:23:22
 * @FilePath: \kkb-node\src\03-http\index.js
 */
const http = require("http")
const fs = require("fs")
const server = http.createServer((req, res) => {
  const { url, method, headers } = req
  if (url === '/' && method === 'GET') {
    fs.readFile("./src/03-http/index.html", (err, data) => {
      if (err) {
        console.log('ππ~ err:', err);
        res.writeHead(500, { 'Content-Type': 'text/plain;charset=utf-8' })
        res.end("500 ζε‘ε¨ιθ――")
        return
      }
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/html')
      res.end(data)
    })
  }
  else if (url === '/getUser' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ name: "warbler" }))
  }
  else if (method === 'GET' && headers.accept.indexOf("image/*") !== -1) {
    // η»δΈζθΏ°ζζηεΎηθ―·ζ±
    fs.createReadStream(`./src/03-http/${url}`).pipe(res)
  }
  else {
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/plain;charset=utf-8')
    res.end("404 ι‘΅ι’ζͺζΎε°")
  }

})
server.listen(3000, () => {
  console.log('ππ~ sever at 3002');
})


function getPrototypeChain(obj) {
  var protoChain = []
  while (obj = Object.getPrototypeOf(obj)) {
    protoChain.push(obj)
  }
  return protoChain
}