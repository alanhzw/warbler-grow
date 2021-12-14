/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-12-14 17:13:05
 * @LastEditTime: 2021-12-14 17:28:33
 * @FilePath: \kkb-node\src\07-kao2\bodyparse.js
 */
const middleWare = async (ctx, next) => {
  console.log('🚀🚀~ body-parser');
  const req = ctx.request.req
  let reqData = [];
  let size = 0;
  await new Promise((resolve, reject) => {
    req.on('data', data => {
      console.log('🚀🚀~ req on', data);
      reqData.push(data);
      size += data.length
    })
    req.on('end', () => {
      console.log('🚀🚀~ end');
      const data = Buffer.concat(reqData, size)
      console.log('🚀🚀~ data:', size, data.toString());
      ctx.request.body = data.toString()
    })
  })
  await next()
};


module.exports = middleWare


// static.js
