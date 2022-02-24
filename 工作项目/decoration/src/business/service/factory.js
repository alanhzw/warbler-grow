const httpRequestMethod = (methodConfig, data, request) => {
  // 获取请求的相关设置，默认是post请求，路径中无参数，非下载方法
  const { url, method = 'POST', headers = {} } = methodConfig;
  // 请求使用的url
  let requestUrl = url;
  // 如果请求中有pathParams则进行替换
  if (data && typeof data !== 'string') {
    for (const key of Object.keys(data)) {
      requestUrl = requestUrl.replace(`{${key}}`, data[key]);
    }
  }
  // 组织请求参数
  const req = {
    url: requestUrl,
    method: method.toUpperCase(),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      ...headers,
    },
  };
  if (req.method === 'GET') {
    req.params = data;
  } else if (req.method === 'POST') {
    req.data = data;
  }
  return request(req);
};

/**
 * service 工厂
 * @param {Object} apis 接口集
 * @param {Axios} request instances
 */
const factory = (apis, request) => {
  const service = {};
  // 遍历模块的api列表，为每个api在模块的service中添加一个执行方法
  Object.keys(apis).forEach((name) => {
    const methodConfig = apis[name];
    service[name] = (data = {}) => httpRequestMethod(methodConfig, data, request);
  });
  return service;
};

export default factory;
