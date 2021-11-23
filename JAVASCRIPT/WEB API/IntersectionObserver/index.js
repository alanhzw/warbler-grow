/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-08-11 16:52:21
 * @LastEditTime: 2021-08-12 18:14:04
 * @FilePath: \IntersectionObserver\index.js
 */

((doc) => {

  //获取目标元素
  const target = doc.querySelector(".target")
  //回调函数
  const callback = (entries, observer) => {
    console.log('🚀🚀~ 执行了', entries[0])
    const myEntry = entries[0]
    if (!myEntry.isIntersecting) {
      target.style.position = "fixed"
      target.style.top = "0px"
    }
  };
  //配置对象
  const options = {
    root: null,
    rootMargin: '0px 0px 0px 0px',
    threshold: [0, 1],
    trackVisibility: true,
    delay: 100
  };
  //创建观察器
  const myObserver = new IntersectionObserver(callback, options);

  //开始监听目标元素
  myObserver.observe(target);

  console.log('🚀🚀~ myObserver:', myObserver);
})(document)


