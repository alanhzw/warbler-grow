export function firstDecorator(Target: any) {
  const targetClassInstance = new Target();
  console.log('des装饰器执行');
  Object.keys(Target.prototype).forEach((methodname) => {
    console.log('methodname', methodname);
  });
}

@firstDecorator
class CustomerService {
  name: string = '下单';
  constructor() {
    console.log('构造函数执行');
  }

  buy() {
    console.log(`${this.name}购买`);
  }

  pay() {
    console.log(`${this.name}下单`);
  }
}
