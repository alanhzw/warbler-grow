import 'reflect-metadata';

const obj = {
  username: 'ds',
  age: 12,
  info() {
    console.log('xasdxsa');
  },
};

Reflect.defineMetadata('des', '打萨达萨达撒旦1', obj);
Reflect.getMetadata('des', obj);
console.log(Reflect.getMetadata('des', obj));
Reflect.defineMetadata('des', '打萨达萨达撒旦2', obj, 'username');
console.log(Reflect.getMetadata('des', obj, 'username'));

@Reflect.metadata('des', 'ddd')
class People {
  @Reflect.metadata('des', 'xingming')
  username = 'wangwu';

  @Reflect.metadata('des', '吃')
  eat() {}
}
console.log(Reflect.getMetadata('des', People));
console.log(Reflect.getMetadata('des', People.prototype, 'username'));
console.log(Reflect.getMetadata('des', People.prototype, 'eat'));
