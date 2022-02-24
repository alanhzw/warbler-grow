/*
 * @Description:封装的一些苏宁方法
 * @Autor: hanzhiwei
 * @Date: 2020-12-10 13:46:52
 * @LastEditTime: 2020-12-28 11:12:22
 * @FilePath: \SNActivity\src\assets\js\suning.js
 */

export default () => {
  // 声明苏宁SDK变量
  const galaxie = window.galaxie;
  // 获取客户端版本号
  const appVersion = galaxie.env.getAppVersion((error, version) => {
    if (error) {
      // Toast("获取客户端版本号失败");
      return false;
    } else {
      return version;
    }
  });
  // 判断小程序环境
  const isMiniApp = galaxie.env.isMiniApp();
  // 判断安卓环境
  const isAndroid = galaxie.env.isAndroid();
  // 判断iOS环境
  const isIOS = galaxie.env.isIOS();
  // 判断PC浏览器环境
  const isBrowser = galaxie.env.isBrowser();
  // 判断易购客户端环境
  const isSnApp = galaxie.env.isSnApp();

  return {
    galaxie,
    appVersion,
    isMiniApp,
    isAndroid,
    isIOS,
    isBrowser,
    isSnApp,
  };
};
