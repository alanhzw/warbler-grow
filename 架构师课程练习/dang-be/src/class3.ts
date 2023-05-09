function first(params: string) {
  return function firstDecorator(Target: any) {
    const targetClassInstance = new Target();
    console.log('第一个des装饰器执行', `参数是${params}`);
  };
}

function second(params: string) {
  return function firstDecorator(Target: any) {
    const targetClassInstance = new Target();
    console.log('第二个des装饰器执行', `参数是${params}`);
  };
}

@first('aa')
@second('bb')
export class CustomerService {
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
