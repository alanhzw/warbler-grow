import 'reflect-metadata';

export function reqProcess(type: string) {
  return function (reqPath: string) {
    return function (
      targetClassPrototype: any,
      methodName: string,
      methodDecri: PropertyDescriptor,
    ) {
      Reflect.defineMetadata('path', reqPath, targetClassPrototype, methodName);
      Reflect.defineMetadata('methodType', type, targetClassPrototype, methodName);
    };
  };
}

const get = reqProcess('get');
const post = reqProcess('post');
const put = reqProcess('put');
const del = reqProcess('delete');

export { get, post, put, del };
