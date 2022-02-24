/**
 * 页面初始化和resize的时候计算并设置根元素字号，使rem单位准确生效
 *
 * @param uiPageWidth 设计稿的页面宽度
 * @param rate 编码相对于设计稿的数值比例（设计稿尺寸/css尺寸）
 */
export function initRem(uiPageWidth = 750, rate = 100): void {
  const docEl: HTMLElement = document.documentElement;
  const bodyEl: HTMLElement = document.body;
  const recalc = () => {
    const { clientWidth, clientHeight } = docEl;

    if (clientWidth <= clientHeight) {
      // 竖屏
      docEl.style.fontSize = `${rate * (clientWidth / uiPageWidth)}px`;
    } else {
      // 横屏
      docEl.style.fontSize = `${rate * (clientHeight / uiPageWidth)}px`;
    }
    // 重制body的字号为16px，避免html的字号对px的影响
    // 总感觉这段代码会有问题
    bodyEl.style.fontSize = '16px';
  };

  document.addEventListener('DOMContentLoaded', recalc, false);
  window.onresize = recalc;
  recalc();
}

/**
 * 获取完域名
 */
export function getDomain(): string {
  return document.domain;
}

/**
 * 获取一级域名
 */
export function getMainDomain(): string {
  return document.domain.split('.').slice(-2).join('.');
}

/**
 * 加载脚本
 *
 * @export
 * @param {string} src 脚本资源地址
 * @return {*}  {Promise<void>}异步promise
 */
export function loadScript(src: string): Promise<void> {
  return new Promise<void>((resolve) => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.onload = () => {
      resolve();
    };
    script.src = src;
    document.body.appendChild(script);
  });
}

interface PathParams {
  [propName: string]: string;
}

/**
 * 获取url中的参数，包含hash路由类型
 */
function getUrlVars(): PathParams {
  const vars: PathParams = {};
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => { vars[key] = value; });
  return vars;
}

/**
 * 根据路径pattern解析路径参数
 *
 * @export
 * @param {string} [pattern='/m/:vendorId/:activityId'] 模式pattern
 * @return {*}  {PathParams}解析结果
 */
export function parsePathByPattern(pattern = '/m/:venderId/:activityType/:activityId'):PathParams {
  const pathParams: PathParams = {};
  const { pathname } = window.location;
  const mIndex = pathname.indexOf('/m');
  const url = pathname.substring(mIndex);
  const valueArr = url.split('/');
  pattern.split('/').forEach((key, index) => {
    if (key.startsWith(':')) {
      pathParams[key.slice(1)] = valueArr[index];
    }
  });
  // const queryParams = QS.parse(window.location.search.slice(1)) as PathParams;
  const queryParams: PathParams = getUrlVars();
  return {
    ...pathParams,
    ...queryParams,
  };
}

export default {
  initRem,
  getDomain,
  getMainDomain,
  loadScript,
};
