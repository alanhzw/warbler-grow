/*
 * @Author: δΈε°Ύζ΅θΊ
 * @Description:
 * @Date: 2021-12-14 17:13:05
 * @LastEditTime: 2021-12-14 17:28:33
 * @FilePath: \kkb-node\src\07-kao2\bodyparse.js
 */
const middleWare = async (ctx, next) => {
  console.log('ππ~ body-parser');
  const req = ctx.request.req
  let reqData = [];
  let size = 0;
  await new Promise((resolve, reject) => {
    req.on('data', data => {
      console.log('ππ~ req on', data);
      reqData.push(data);
      size += data.length
    })
    req.on('end', () => {
      console.log('ππ~ end');
      const data = Buffer.concat(reqData, size)
      console.log('ππ~ data:', size, data.toString());
      ctx.request.body = data.toString()
    })
  })
  await next()
};


module.exports = middleWare


// static.js
