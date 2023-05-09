import 'reflect-metadata';
import AllCtrlRouterLoader from '@/common/AllCtrlRouterLoader';

type MethodType = 'get' | 'post' | 'put' | 'delete';

export function Controller(modulePath: string = '') {
  return function (target: new (...args: any) => any) {
    // 获取原型上的请求方法名
    const [cus, ...methods] = Object.getOwnPropertyNames(target.prototype);
    methods.forEach((methodname) => {
      // 根据方法名获取具体的方法体
      const routerHandlerFn = target.prototype[methodname];
      // 获取请求路径和请求类型,跟路由对象
      const path: string = Reflect.getMetadata('path', target.prototype, methodname);
      const fullPath: string = `${modulePath}${path}`;
      const methodType: MethodType = Reflect.getMetadata(
        'methodType',
        target.prototype,
        methodname,
      );
      // 实现路由请求
      const rootRouter = AllCtrlRouterLoader.app.context.rootRouter;
      rootRouter[methodType](fullPath, routerHandlerFn);
    });
  };
}
