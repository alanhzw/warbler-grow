/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-12-10 17:57:01
 * @LastEditTime: 2021-12-11 21:22:14
 * @FilePath: \kkb-node\src\07-kao2\compose-koa.js
 */

// 函数组合
function compose(middleWares) {
  return function() {
    return dispatch(0)
    function dispatch(i) {
      let fn = middleWares[i]
      if (!fn) {
        return Promise.resolve()
      }
      return Promise.resolve(
        fn(function next() {
          return dispatch(i + 1)
        })
      )
    }
  }
}

async function fn1(next) {
  console.log("fn1 begin");
  await next();
  console.log("fn1 end");
}
async function fn2(next) {
  console.log("fn2 begin");
  await delay();
  await next();
  console.log("fn2 end");
}
function fn3(next) {
  console.log("fn3");
}

// 模拟异步方法
function delay() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
}

const middleWares = [fn1, fn2, fn3];
const finalFn = compose(middleWares);
finalFn();